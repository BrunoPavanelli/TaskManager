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

const permissionsArray = [
    {
        name: "CAN_CREATE_ROLE",
        description: "permisson to create a new role"
    },
    {
        name: "CAN_UPDATE_ROLE",
        description: "permisson to update a role"
    },
    {
        name: "CAN_DELETE_ROLE",
        description: "permisson to delete a role"
    },
    {
        name: "CAN_CREATE_PERIMISSION",
        description: "permisson to create a new permission"
    },
    {
        name: "CAN_UPDATE_PERIMISSION",
        description: "permisson to update a permission"
    },
    {
        name: "CAN_DELETE_PERIMISSION",
        description: "permisson to delete a permission"
    },
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
    {
        name: "CAN_UPDATE_DEADLINE",
        description: "permission to add a deadline to a task",
    },
    {
        name: "CAN_REMOVE_DEADLINE",
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
        description: "role that gives all permissions all tasks resources"
    }
];
