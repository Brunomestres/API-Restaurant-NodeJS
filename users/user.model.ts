const users = [
    {name: 'Bruno', emal:'bruno@'},
    {name: 'Phil', emal:'phil@'},
];

export class User {
    static findAll(): Promise<any>
    {
        return Promise.resolve(users);
    }
}