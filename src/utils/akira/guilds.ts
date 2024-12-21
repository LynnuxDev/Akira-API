import * as fs from 'fs';
import path from 'path';

const guildsFilePath = path.resolve(__dirname, '../../../data/guilds.json');

/**
 * Get the Featured Guilds list.
 * @returns Json of /data/guilds.json
 */
export const readGuildsFromFile = () => {
  try {
    const data = fs.readFileSync(guildsFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading guilds file:', error);
    throw new Error('Failed to read guilds data');
  }
};

/**
 * 
 * @param guilds 
 */
export const writeGuildsToFile = (guilds: any) => {
  try {
    const jsonData = JSON.stringify(guilds, null, 2);
    fs.writeFileSync(guildsFilePath, jsonData, 'utf-8');
  } catch (error) {
    console.error('Error writing to guilds file:', error);
    throw error;
  }
};