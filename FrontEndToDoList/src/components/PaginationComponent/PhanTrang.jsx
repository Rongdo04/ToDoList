import React from "react";
import { Pagination } from "antd";
const PhanTrang = ({ pageNumber, onChange }) => (
  <>
    <Pagination total={pageNumber} onChange={onChange} />
  </>
);
export default PhanTrang;
