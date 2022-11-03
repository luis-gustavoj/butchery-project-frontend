import TrashIcon from "@svg/trash-icon.svg";
import EditIcon from "@svg/edit-icon.svg";
import styles from "./styles.module.scss";
import React, { useState } from "react";
import { useUsersQuery } from "src/hooks/useUsers";
import { users } from "src/services";
import toast from "react-hot-toast";
import { queryClient } from "src/provider/ReactQueryProvider";

export const UsersTable = () => {
  const { data } = useUsersQuery();
  const usersData = data?.data;

  const handleDeleteUser = async (id: string) => {
    await toast.promise(users.delete(id), {
      loading: "Excluindo usuário...",
      success: () => {
        queryClient.invalidateQueries(["users"]);
        return "Usuário excluído com sucesso!";
      },
      error: "Erro ao excluir usuário",
    });
  };

  return (
    <table className={styles.productsTable}>
      <thead>
        <tr>
          <th>Nome</th>
          <th>E-mail</th>
          <th>Criado em</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {usersData &&
          usersData.map((user) => (
            <React.Fragment key={user.id}>
              <tr>
                <td>
                  {user.firstName} {user.lastName}
                </td>
                <td>{user.email}</td>
                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                <td className={styles.actionsContainer}>
                  <button
                    type="button"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    <TrashIcon />
                  </button>
                </td>
              </tr>
            </React.Fragment>
          ))}
      </tbody>
    </table>
  );
};
