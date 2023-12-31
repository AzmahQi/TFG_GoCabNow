
import {PrismaClient} from '@prisma/client'
import path from 'path';
import fs from 'fs';

const prisma = new PrismaClient();

async function main() {
  try {
    const rawSql = await fs.promises.readFile(path.join(__dirname, 'base.sql'), {
      encoding: 'utf-8',
    });
    console.log("Raw: "+rawSql);
    console.log("file: "+path.join(__dirname, '/base.sql'));
    const sqlReducedToStatements = rawSql
      .split('\n')
      .filter((line) => !line.startsWith('--')) // remove comments-only lines
      .join('\n')
      .replace(/\r\n|\n|\r/g, ' ') // remove newlines
      .replace(/\s+/g, ' '); // excess white space
    const sqlStatements = splitStringByNotQuotedSemicolon(sqlReducedToStatements);

    for (const sql of sqlStatements) {
        console.log(sql);
      await prisma.$queryRaw `${sql}`;
    }
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

function splitStringByNotQuotedSemicolon(input: string): string[] {
  const result = [];

  let currentSplitIndex = 0;
  let isInString = false;
  for (let i = 0; i < input.length; i++) {
    if (input[i] === "'") {
      // toggle isInString
      isInString = !isInString;
    }
    if (input[i] === ';' && !isInString) {
      result.push(input.substring(currentSplitIndex, i + 1));
      currentSplitIndex = i + 2;
    }
  }

  return result;
}

void main();