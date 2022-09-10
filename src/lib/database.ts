import { MongoClient } from 'mongodb';

/**
 * Database
 */
export default {
  connect: async (url: string) => {
    if (url) {
      const client = new MongoClient(url);
      try {
        await client.connect();
        console.log('Successfully Connected Database!');
        return {
          client,
          ref: client.db(process.env.MONGODB_DBNAME),
        };
      } catch (e) {
        console.error(e);
      }
    }
    return {};
  },
  operation: ({ ref }: any) => {
    /**
     * Collection reference
     * @param name
     */
    const _col = (name: string) => {
      if (ref) {
        return ref.collection(name);
      }
    };
    return {
      col: _col,
      /**
       * Count documents
       * @param name
       * @param query
       * @param options
       */
      count: (name: string, query: object, options: any = null) => {
        const col = _col(name);
        if (col) {
          return col.count(query, options);
        }
      },
      /**
       * Create document
       * @param name
       * @param query
       * @param args
       */
      read: async (
        name: string,
        query: any = null,
        options: any = null,
        bulk: boolean = false,
      ): Promise<any> => {
        const col = _col(name);
        if (col) {
          options = {
            projection: { _id: 0 },
            ...options,
          };
          if (bulk) {
            let items: any = [];
            let cursor: any = col.find(query, options);

            if ((await cursor.count()) > 0) {
              await cursor.forEach((v: any) => items.push(v));
            }
            return items;
          } else {
            return await col.findOne(query, options);
          }
        }
      },
      /**
       * Create document
       * @param name
       * @param data
       */
      create: async (name: string, data: any = null): Promise<any> => {
        const col = _col(name);
        if (col) {
          let result = null;
          if (Array.isArray(data)) {
            result = await col.insertMany(data);
          } else {
            result = await col.insertOne(data);
          }
          if (result && result.acknowledged) {
            return data;
          }
        }
      },
      /**
       * Create document
       * @param name
       * @param query
       * @param data
       */
      update: async (
        name: string,
        query: any,
        data: any,
        options: any = null,
      ): Promise<any> => {
        const col = _col(name);
        if (col) {
          let doc = await col.updateOne(query, { $set: data }, options);
          if (doc.matchedCount) {
            return query;
          }
        }
      },
      /**
       * Create document
       * @param name
       * @param query
       * @param bulk
       */
      delete: async (
        name: string,
        query: any,
        bulk: boolean = false,
      ): Promise<any> => {
        const col = _col(name);
        if (col) {
          if (bulk) {
            if ((await col.deleteMany(query)).acknowledged) {
              return query;
            }
          } else {
            if ((await col.deleteOne(query)).acknowledged) {
              return query;
            }
          }
        }
      },
      /**
       * Aggregate operation
       * @param name
       * @param query
       * @param options
       * @returns
       */
      aggregate: async (
        name: string,
        query: any = [],
        options: any = null,
      ): Promise<any> => {
        const col = _col(name);
        if (col) {
          let items: any = [];
          let cursor: any = col.aggregate(
            [{ $project: { _id: 0 } }, ...query],
            options,
          );
          if (cursor) {
            await cursor.forEach((v: any) => items.push(v));
          }
          return items;
        }
      },
    };
  },
};
