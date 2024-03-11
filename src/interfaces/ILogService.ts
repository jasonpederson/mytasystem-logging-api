import type { LogRequestDTO } from '../dtos/incoming/LogRequestDTO';

export default interface ILogService {
	log(data: LogRequestDTO): void;
}
