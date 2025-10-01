export const data = {
  modelName: 'stepActionableType',
  staticRecordName: null,
  staticRecordKeyName: null,
  dependency: true,
  dependencies: ['userRoles'],
  seed: (dependencies: any) => {
    const { userRoles } = dependencies;
    return [
      {
        name: 'Complete Step',
        description: 'Utilize all step materials and appropriate equipment. Ensure that all step instructions and addendums are followed.',
        dataType: 'boolean',
        userRoleId: userRoles.production,
        bgColor: '#333333',
        textColor: '#ffffff'
      }
    ]
  },
};

