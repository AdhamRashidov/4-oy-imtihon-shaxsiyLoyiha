import { Repository } from "typeorm";
import { BookHistoryEntity } from "../entity/bookHistory.entity";

export type BookHistoryRepository = Repository<BookHistoryEntity>;