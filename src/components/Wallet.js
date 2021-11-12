import React from "react";
import customAxios from "../config/customAxios";
import { useEffect, useState } from "react";
import { Table } from "reactstrap";
import { useQuery } from "react-query";
import { Button } from "reactstrap";
import { logout } from "../store/slice/authSlice";
import { useHistory } from "react-router";

import { useDispatch } from "react-redux";

function useWallet() {
  return useQuery("Wallet", async () => {
    const { data } = await customAxios.get("/Wallet/GetAllAccounts/");
    return data.Data;
  });
}

function Wallet() {
  const dispatch = useDispatch();
  const history = useHistory();

  const { data, isLoading, isError, isFetching } = useWallet();

  if (isFetching) {
    return "در حال واکشی...";
  }

  if (isLoading) {
    return "در حال بارگیری...";
  }

  if (isError) {
    return "خطایی رخ داده است!";
  }

  const col = [
    {
      title: "شناسه",
      key: "ID",
    },
    {
      title: "ارز",
      key: "CoinSymbol",
    },
    {
      title: "دارایی کل",
      key: "WholeBalance",
    },
    {
      title: "شماره موبایل",
      key: "MobileNumber",
    },
  ];

  return (
    <div className="table-items">
      <h1>کیف پول</h1>
      <Table bordered className="Table ">
        <thead>
          <tr>
            {col.map((item) => (
              <th key={item.key}>{item.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.map((items) => {
            return (
              <tr key={items.ID}>
                {col.map((item) => (
                  <td key={item.key}>
                    {item?.render ? item?.render(items) : items[item?.key]}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default Wallet;
