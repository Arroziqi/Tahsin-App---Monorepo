import { Inject, Injectable, Logger } from '@nestjs/common';
import { UseCase } from 'src/core/domain/usecases/usecase';
import { DataState } from 'src/core/resources/data.state';
import { EVENT_REPO_TOKEN } from 'src/core/const/provider.token';
import { EventRepository } from '../../repository/event.repository';

@Injectable()
export class DeleteEventUsecase implements UseCase<number, DataState<string>> {
  private readonly logger = new Logger(DeleteEventUsecase.name);

  constructor(
    @Inject(EVENT_REPO_TOKEN) private readonly eventRepository: EventRepository,
  ) {}

  async execute(input: number): Promise<DataState<string>> {
    this.logger.debug(`Deleting event with id: ${input}`);
    const result = await this.eventRepository.delete(input);

    this.logger.log(`Successfully deleted event with id: ${input}`);
    return result;
  }
}
