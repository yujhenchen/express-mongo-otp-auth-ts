it('should generate a token correctly', async () => {
    const userDoc = {
        generateToken: jest.fn().mockResolvedValueOnce("new_mocked_token"),
    };

    const token = await userDoc.generateToken();

    expect(userDoc.generateToken).toHaveBeenCalled();
    expect(token).toBe("new_mocked_token");
});

it('should delete the token correctly', async () => {
    const userDoc = {
        deleteToken: jest.fn().mockResolvedValueOnce(undefined),
    };

    await userDoc.deleteToken();

    expect(userDoc.deleteToken).toHaveBeenCalled();
});

it('should convert user to JSON correctly excluding the password', () => {
    const jsonResponse = {
        name: "John Doe",
        email: "john@example.com",
        role: "user",
        token: "mocked_token",
        createdAt: new Date(),
    };

    const userDoc = {
        toJSON: jest.fn().mockReturnValueOnce(jsonResponse),
    };

    const result = userDoc.toJSON();

    expect(userDoc.toJSON).toHaveBeenCalled();
    expect(result).toEqual(jsonResponse);
    expect(result).not.toHaveProperty('password');
});
