import fs from 'fs';
import csv from 'csv-parse';
import { getRepository, getCustomRepository } from 'typeorm';
import Transaction from '../models/Transaction';
import Category from '../models/Category';
import TransactionsRepository from '../repositories/TransactionsRepository';

interface CSVData {
  title: string;
  type: 'income' | 'outcome';
  value: string;
  category: string;
}

class ImportTransactionsService {
  async execute(path: string): Promise<Transaction[]> {
    const categoryRepository = getRepository(Category);
    const transactionsRepository = getCustomRepository(TransactionsRepository);

    const transactions: CSVData[] = [];
    const categories: string[] = [];
    const readyTransactions: Omit<
      Transaction,
      'id' | 'created_at' | 'updated_at' | 'update' | 'insert' | 'category'
    >[] = [];

    const parseCSV = fs.createReadStream(path).pipe(csv({ from_line: 2 }));

    parseCSV.on('data', data => {
      const [title, type, value, category] = data.map((line: string) =>
        line.trim(),
      );

      categories.push(category);
      transactions.push({ title, type, value, category });
    });

    await new Promise(resolve => parseCSV.on('end', resolve));

    for (let i = 0; i < categories.length; i += 1) {
      const category = categories[i];

      // eslint-disable-next-line no-await-in-loop
      let categoryTransaction = await categoryRepository.findOne({
        where: { title: category },
      });

      if (!categoryTransaction) {
        categoryTransaction = categoryRepository.create({
          title: category,
        });

        // eslint-disable-next-line no-await-in-loop
        const { id } = await categoryRepository.save(categoryTransaction);

        transactions.forEach(transaction => {
          if (transaction.category === category) {
            readyTransactions.push({
              title: transaction.title,
              value: Number(transaction.value),
              type: transaction.type,
              category_id: id,
            });
          }
        });
      }
    }

    const bulkTransactions = transactionsRepository.create(readyTransactions);

    await transactionsRepository.save(bulkTransactions);

    return bulkTransactions;
  }
}

export default ImportTransactionsService;
