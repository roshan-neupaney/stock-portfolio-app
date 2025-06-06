import React, { useEffect, useMemo, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import PageHeader from "../../../src/components/PageHeader";
import Table, { TData } from "../../../src/components/Tables/Table";
import DeleteModal from "../../../src/components/Modal/deleteModal";
import AddStockModal from "../../../src/components/Modal/addStockModal";
import { BeautifyStockList } from "../../../src/utils/beautify";
import { toast } from "react-toastify";
import CustomInput from "../../../src/components/Forms/input";
import useAddStockModalStore from "../../zustand/useAddStockModalStore";
import useDeleteModalStore from "../../../src/zustand/useDeleteModalStore";

const Index: React.FC = () => {
  const [data, setData] = useState<StockFormType[]>([]);

  const {
    toggleAddStockModal,
    status: addModalStatus,
    id: addId,
  } = useAddStockModalStore();
  const {
    toggleDeleteModal,
    status: deleteModalStatus,
    id: deleteId,
  } = useDeleteModalStore();

  useEffect(() => {
    const data = localStorage.getItem("portfolio_stocks") || "[]";
    const parsedData: StockFormType[] = JSON.parse(data);
    const beautifiedData = BeautifyStockList(parsedData);
    setData(beautifiedData);
  }, []);

  const columns: ColumnDef<TData>[] = useMemo(
    () => [
      {
        accessorKey: "ticker",
        header: "Ticker",
      },
      {
        accessorKey: "company_name",
        header: "Company Name",
      },
      {
        accessorKey: "quantity",
        header: "Quantity",
      },
      {
        accessorKey: "purchased_price",
        header: "Purchased Price",
      },
      {
        accessorKey: "current_price",
        header: "Current Price",
      },
      {
        accessorKey: "action",
        header: "Action",
      },
    ],
    []
  );

  const handleDelete = () => {
    if (deleteId) {
      const data = localStorage.getItem("portfolio_stocks") || "[]";
      const parsedData: StockFormType[] = JSON.parse(data);
      const filteredData = parsedData.filter((items) => items.id !== deleteId);
      localStorage.setItem("portfolio_stocks", JSON.stringify(filteredData));
      const beautifiedData = BeautifyStockList(filteredData);
      setData(beautifiedData);
      toast.success("Stock deleted successfully");
      toggleDeleteModal(false, "");
    }
  };

  const handleSearch = (searchedTearm: string) => {
    const value = searchedTearm.toLowerCase();
    const data = localStorage.getItem("portfolio_stocks") || "[]";
    const parsedData: StockFormType[] = JSON.parse(data);
    const filteredData = parsedData.filter((items) => {
      if (
        items.company_name.toLowerCase().includes(value) ||
        items.ticker.toLowerCase().includes(value)
      )
        return items;
    });
    setData(filteredData);
  };

  return (
    <div className="space-y-4">
      <PageHeader title={"Portfolio"} />
      <Table
        tableColumns={columns}
        tableData={data}
        topRender={
          <div className="m-2 w-fit">
            <CustomInput
              placeholder="Search..."
              onChange={(val: string) => handleSearch(val)}
              variant="outlined"
              className="sm:w-fit !max-w-60"
            />
          </div>
        }
        noDataFound={!data || data.length === 0}
      />

      <DeleteModal
        open={deleteModalStatus}
        handleClose={() => toggleDeleteModal(false, "")}
        label="stock"
        handleSubmit={handleDelete}
      />
      <AddStockModal
        open={addModalStatus}
        handleClose={() => toggleAddStockModal(false, "")}
        id={addId}
        setData={setData}
      />
    </div>
  );
};

export default Index;
