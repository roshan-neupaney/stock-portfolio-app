import React, { useEffect, useMemo, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import PageHeader from "../../../src/components/PageHeader";
import Table, { TData } from "../../../src/components/Tables/Table";
import DeleteModal from "../../../src/components/Modal/deleteModal";
import AddStockModal from "../../../src/components/Modal/addStockModal";
import { BeautifyStockList } from "../../../src/utils/beautify";
import { toast } from "react-toastify";

interface deleteModalType {
  id?: string;
  state: boolean;
}

const defaultModal = {
  id: undefined,
  state: false,
};

const Index: React.FC = () => {
  const [openDeleteModal, toggleDeleteModal] =
    useState<deleteModalType>(defaultModal);
  const [openFormModal, toggleFormModal] =
    useState<deleteModalType>(defaultModal);
  const [data, setData] = useState<StockFormType[]>([]);

  useEffect(() => {
    const data = localStorage.getItem("portfolio_stocks") || "[]";
    const parsedData: StockFormType[] = JSON.parse(data);
    const beautifiedData = BeautifyStockList(parsedData);
    console.log("beautifiedData", beautifiedData);
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
    if (openDeleteModal.id) {
      const data = localStorage.getItem("portfolio_stocks") || "[]";
      const parsedData: StockFormType[] = JSON.parse(data);
      const filteredData = parsedData.filter(
        (items) => items.id !== openDeleteModal.id
      );
      localStorage.setItem("portfolio_stocks", JSON.stringify(filteredData));
      const beautifiedData = BeautifyStockList(filteredData);
      setData(beautifiedData);
      toast.success("Stock deleted successfully");
      toggleDeleteModal(defaultModal)
    }
  };

  return (
    <div className="space-y-4">
      <PageHeader title={"Portfolio"} toggleFormModal={toggleFormModal} />
      <Table
        tableColumns={columns}
        tableData={data}
        // topRender={
        //   <div className="m-2 w-fit">
        //     <InputForm placeholder="Search..." />
        //   </div>
        // }
        // isLoading={isLoading}
        toggleModal={toggleDeleteModal}
        noDataFound={!data || data.length === 0}
        toggleFormModal={toggleFormModal}
      />

      <DeleteModal
        open={openDeleteModal.state}
        handleClose={() => toggleDeleteModal(defaultModal)}
        label="stock"
        handleSubmit={handleDelete}
      />
      <AddStockModal
        open={openFormModal.state}
        handleClose={() => toggleFormModal(defaultModal)}
        id={openFormModal?.id}
        setData={setData}
      />
    </div>
  );
};

export default Index;
