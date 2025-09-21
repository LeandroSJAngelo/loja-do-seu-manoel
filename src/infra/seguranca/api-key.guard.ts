import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { segurancaConstants } from "./seguranca.constants";

@Injectable()
export class ApiKeyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['x-api-key'];
    if(apiKey && apiKey === segurancaConstants.apiKey) {
      return true;
    }

    throw new UnauthorizedException('API Key inválida ou ausente');
  }
}