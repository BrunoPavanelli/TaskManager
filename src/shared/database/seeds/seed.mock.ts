const makeUsersArray = (arrayLength: number) => {
    const usersArray = Array.from(Array(arrayLength)).map((user, index) => {
        return index === 0
            ? {
                  name: "master_admin",
                  email: "masteradmin@mail.com",
                  perfil: "master admin",
                  password: "1234",
              }
            : {
                  name: `common_user${index + 1}`,
                  email: `common${index + 1}@mail.com`,
                  perfil: `common ${index + 1}`,
                  password: "1234",
              };
    });

    return usersArray;
};

const permissionsArrays = [
    {
        name: "CAN_CREATE_USER",
        description: "permission to create a new user",
    },
    {
        name: "CAN_CREATE_TASK",
        description: "permission to create a new task",
    },
    {
        name: "CAN_UPDATE_TASK",
        description: "permission to update a task",
    },
    {
        name: "CAN_DELETE_TASK",
        description: "permission to delete a task",
    },
    {
        name: "CAN_ADD_DEADLINE",
        description: "permission to add a deadline to a task",
    },
];

const rolesArray = [
    {
        name: "MASTER_ADMIN",
        description: "role that gives all permissions"
    },
    {
        name: "TASK_MANIPULATOR",
        description: "role that gives all permissions to use all tasks resources"
    }
];
