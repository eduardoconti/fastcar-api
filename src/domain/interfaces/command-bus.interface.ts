import { ICommandHandler } from './command-handler.interface';
import { ICommand } from './command.interface';

export interface ICommandBus<BaseCommand extends ICommand = ICommand> {
  registerHandler(handler: ICommandHandler<BaseCommand>): any;
  send<T extends BaseCommand>(command: T): any;
}
