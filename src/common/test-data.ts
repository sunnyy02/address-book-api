export class TestData {
    static readonly user1 ={id: 1, user_name: 'user1', email: 'user1@example.com', password: 'password' };
    static readonly expected_user1 ={id: 1, user_name: 'user1', email: 'user1@example.com' };
    static readonly user2 = {id: 2, user_name: 'user2', email: 'user2@example.com', password: 'password' }; 
    static readonly expected_user2 = {id: 2, user_name: 'user2', email: 'user2@example.com' }; 
    static readonly allUsers = [
        TestData.user1, TestData.user2
    ];
    static readonly expected_allUsers = [
        TestData.expected_user1, TestData.expected_user2
    ];
}