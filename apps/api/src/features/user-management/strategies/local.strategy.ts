import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../services/auth.service';
import { UserEntity } from '../domain/entities/user.entity';
import { DataState } from 'src/core/resources/data.state';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(LocalStrategy.name);

  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
    });
    this.logger.log('LocalStrategy initialized');
  }

  async validate(
    email: string,
    password: string,
  ): Promise<DataState<UserEntity>> {
    this.logger.debug(`Attempting to validate user with email: ${email}`);
    try {
      const result = await this.authService.validateLocalUser(email, password);
      this.logger.debug('User validation completed');
      return result;
    } catch (error) {
      this.logger.error(`Validation failed: ${error.message}`);
      throw error;
    }
  }
}
