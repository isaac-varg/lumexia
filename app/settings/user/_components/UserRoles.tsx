'use client'
import { User } from "@/actions/users/getUser";
import userRoleAssignmentActions from "@/actions/users/userRoleAssignments";
import userRoleActions from "@/actions/users/userRoles";
import Card from "@/components/Card";
import { useAppForm } from "@/components/Form2";
import SectionTitle from "@/components/Text/SectionTitle";
import { UserRole } from "@prisma/client"
import { useRouter } from "next/navigation";
import { useMemo } from "react";

// this mess is necessary because the entries don't store the value...
// the user has the role if the roleAssignment exists 🤦🏽🤦🏽🤦🏽

//type UserRoleAssignment = User["UserRoleAssignment"][number];

type Props = {
  allRoles: UserRole[];
  user: User;
}


const UserRoles = ({ allRoles, user }: Props) => {


  const assignmentValues = new Map(user.UserRoleAssignment.map(role => [role.userRole.id, { value: true, userRoleAssignmentId: role.id }]));
  const router = useRouter()
  const defaultValues = useMemo(() => {

    return allRoles.map(role => ({
      id: role.id,
      value: assignmentValues.get(role.id)?.value || false,
      label: role.name,
    }))
  }, [user])

  const form = useAppForm({
    defaultValues: {
      assignments: defaultValues,
    },
    onSubmit: async ({ value }) => {
      const assignments = value.assignments;

      await Promise.all(assignments.map(async (assignment) => {
        const isExisting = assignmentValues.has(assignment.id);

        if (!isExisting) {
          if (assignment.value === false) return;
          await userRoleAssignmentActions.createNew({ userId: user.id, userRoleId: assignment.id })
          return;
        }

        if (assignment.value === true) {
          // this is not really doing anything but it is kept so it is clear what happens when the 
          // assignment remains active but was already existing (the db entry remains)
          return;
        }

        if (assignment.value === false) {
          const assignmentId = assignmentValues.get(assignment.id)?.userRoleAssignmentId || 'hey';

          await userRoleAssignmentActions.deleteOne({ id: assignmentId });
        }
      }))
      form.reset()
      router.refresh()
    }
  })


  return (
    <div className="flex flex-col gap-6">
      <SectionTitle>User Roles</SectionTitle>

      <Card.Root>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="flex flex-col gap-4"
        >



          <form.AppField name="assignments" mode="array">
            {(field) => {
              return (
                <div className="flex flex-col gap-4">
                  {field.state.value.map((_, i) => {
                    return (
                      <form.AppField
                        key={`assignments[${i}].id`}
                        name={`assignments[${i}].value`} >
                        {(subField) => <subField.ToggleField label={_.label} />}
                      </form.AppField>

                    )
                  })}
                </div>
              )
            }}

          </form.AppField>


          <div>
            <form.AppForm>
              <form.SubmitButton />
            </form.AppForm>
          </div>


        </form>


      </Card.Root>

    </div>
  )
}

export default UserRoles
