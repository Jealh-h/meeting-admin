import React from "react";
import ProTable from "@ant-design/pro-table";

export default function MeetingRoom(props) {
  return (
    <>
      <ProTable
        options={false}
        pagination={{
          size: "default",
          pageSize: 12,
        }}
      ></ProTable>
    </>
  );
}
