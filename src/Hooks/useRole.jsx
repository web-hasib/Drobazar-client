import { use } from "react";

import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../provider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
  const { user, loading } = use(AuthContext);

  const axiosSecure = useAxiosSecure();

  const { data: role, isLoading: isRoleLoading } = useQuery({
    queryKey: ["role", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure(`/user/role/${user?.email}`);
      return data;
    },
  });
  console.log(role, isRoleLoading);

  return [role?.role, isRoleLoading];
};

export default useRole;
