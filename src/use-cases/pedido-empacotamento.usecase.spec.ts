import { Pedido } from "../domain/entities/pedido.entity";
import { PedidoEmpacotamentoUseCase } from "./pedido-empacotamento.usecase";
import { Produto } from "../domain/entities/produto.entity";

describe('PedidoEmpacotamentoUseCase', () => {
  let useCase: PedidoEmpacotamentoUseCase;

  beforeEach(() => {
    useCase = new PedidoEmpacotamentoUseCase();
  });

  it('deve embalar um pedido em caixas disponíveis', () => {
    const order = new Pedido(1, [
      new Produto('PS5', 40, 10, 25),
      new Produto('Volante', 40, 30, 30),
    ]);

    const result = useCase.execute(order);
    expect(result.pedido_id).toBe(1);
    expect(result.caixas.length).toBe(1);
    expect(result.caixas[0].produtos).toContain('PS5');
    expect(result.caixas[0].produtos).toContain('Volante');
    expect(result.caixas[0].caixa_id).toBe('Caixa 1');
  });

  it('deve embalar vários produtos em caixas menores', () => {
    const order = new Pedido(2, [
      new Produto('Joystick', 15, 20, 10),
      new Produto('Fifa 24', 10, 30, 10),
      new Produto('Call of Duty', 30, 15, 10),
    ]);

    const result = useCase.execute(order);
    expect(result.caixas.length).toBe(1);
    expect(result.caixas[0].caixa_id).toBe('Caixa 1');
    expect(result.caixas[0].produtos).toEqual(expect.arrayContaining(['Joystick','Fifa 24','Call of Duty']));
  });

  it('deve devolver a caixa não embalável quando o produto não couber', () => {
    const order = new Pedido(5, [
      new Produto('Cadeira Gamer', 200, 200, 200),
    ]);

    const result = useCase.execute(order);
    expect(result.caixas.length).toBe(1);
    expect(result.caixas[0].caixa_id).toBeNull();
    expect(result.caixas[0].produtos).toContain('Cadeira Gamer');
    expect(result.caixas[0].observacao).toBe('Produto Cadeira Gamer não coube em nenhuma caixa disponível.');
  });

});
