import { userRole } from "~/constants";

export default function({ store, redirect }) {
  if (store.state.auth.user.roleId !== userRole.ADMIN) {
    return redirect("/");
  }
}
