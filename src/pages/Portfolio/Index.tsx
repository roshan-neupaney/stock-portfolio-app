import React, { useMemo, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import PageHeader from "../../../src/components/PageHeader";
import Table, { TData } from "../../../src/components/Tables/Table";
import DeleteModal from "../../../src/components/Modal/deleteModal";
import AddStockModal from "../../../src/components/Modal/addStockModal";

interface deleteModalType {
  id?: string | number;
  state: boolean;
}

const defaultModal = {
  id: undefined,
  state: false,
};

const Index: React.FC = () => {
  // const navigate = useNavigate();

  const [openDeleteModal, toggleDeleteModal] =
    useState<deleteModalType>(defaultModal);
  const [openFormModal, toggleFormModal] =
    useState<deleteModalType>(defaultModal);
  console.log(openDeleteModal);

  // const [paginationData, setPaginationData] = useState<PaginationDataTypes>({
  //   current_page: 1,
  //   per_page: 10,
  //   last_page: 1,
  //   total: 10,
  // });

  // const {
  //   data: campaignData,
  //   isLoading,
  //   refetch,
  // } = useFetchCampaign({
  //   perPage: paginationData?.per_page?.toString(),
  //   page: paginationData?.current_page?.toString(),
  // });
  // const deleteCampaign = useDeleteCampaign();

  // const beautifiedData = beautifyCampaign(campaignData?.data);

  // useEffect(() => {
  //   if (campaignData) {
  //     setPaginationData((prev) => {
  //       return {
  //         ...prev,
  //         current_page: campaignData.current_page,
  //         last_page: campaignData.last_page,
  //         per_page: campaignData.per_page,
  //         total: campaignData.total,
  //       };
  //     });
  //   }
  // }, [campaignData]);

  const columns: ColumnDef<TData>[] = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "description",
        header: "Description",
      },
      {
        accessorKey: "type",
        header: "Type",
      },
      {
        accessorKey: "created_at",
        header: "Created At",
      },
      {
        accessorKey: "action",
        header: "Action",
      },
    ],
    []
  );
  const beautifiedData = [
    {
      name: "Roshan Neupane",
      description: "this is description",
      type: "None",
      created_at: "December 24, 2024",
    },
    {
      name: "Arun Sapkota",
      description: "this is arun",
      type: "None",
      created_at: "October 01, 2025",
    },
    {
      name: "Hello World",
      description: "hello world",
      type: "Variable",
      created_at: "June 18, 2020",
    },
  ];

  // const onClickOnDelete = () => {
  //   if (openDeleteModal.id) {
  //     deleteCampaign.mutate(
  //       { id: Number(openDeleteModal.id) },
  //       {
  //         onSuccess: () => {
  //           toast.success("Campaign deleted successfully");
  //           refetch();
  //           toggleDeleteModal(defaultModal);
  //         },
  //         onError: (error) => {
  //           console.error(error);
  //           toast.error("Error while deleting campaign");
  //         },
  //       }
  //     );
  //   }
  // };

  return (
    <div className="space-y-4">
      <PageHeader title={"Portfolio"} toggleFormModal={toggleFormModal} />
      <Table
        tableColumns={columns}
        tableData={beautifiedData}
        // topRender={
        //   <div className="m-2 w-fit">
        //     <InputForm placeholder="Search..." />
        //   </div>
        // }
        // isLoading={isLoading}
        toggleModal={toggleDeleteModal}
        noDataFound={!beautifiedData || beautifiedData.length === 0}
        toggleFormModal = {toggleFormModal}
      />

      <DeleteModal
        open={openDeleteModal.state}
        handleClose={() => toggleDeleteModal(defaultModal)}
        label="stock"
        handleSubmit={() => {}}
      />
      <AddStockModal
        open={openFormModal.state}
        handleClose={() => toggleFormModal(defaultModal)}
      />
    </div>
  );
};

export default Index;
