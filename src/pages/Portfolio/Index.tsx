import React, { useMemo, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import BreadCrumbFirst from "@/components/breadcrumbs/BreadCrumbFirst";
// import Table, { PaginationDataTypes, TData } from "@/components/tables/Table";
import { ColumnDef } from "@tanstack/react-table";
import PageHeader from "../../../src/components/PageHeader";
import Table, { TData } from "../../../src/components/Tables/Table";
// import Button from "@/components/common/Button/Button";
// import { InputForm } from "@/components/common/Input/InputForm";
// import { beautifyCampaign } from "@/utils/beautify";
// import HeaderWrapper from "@/components/wrapper/HeaderWrapper";
// import DeleteModal from "@/components/Modal/DeleteModal";
// import { toast } from "react-toastify";
// import { useDeleteCampaign, useFetchCampaign } from "@/services/api/tenant/campaign/campaign.hooks";

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

  const [openModal, toggleModal] = useState<deleteModalType>(defaultModal);
  console.log(openModal)

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
    {name: 'Roshan Neupane', description: 'this is description', type: 'None', created_at: 'December 24, 2024'},
    {name: 'Arun Sapkota', description: 'this is arun', type: 'None', created_at: 'October 01, 2025'},
    {name: 'Hello World', description: 'hello world', type: 'Variable', created_at: 'June 18, 2020'},
  ]

  // const onClickOnDelete = () => {
  //   if (openModal.id) {
  //     deleteCampaign.mutate(
  //       { id: Number(openModal.id) },
  //       {
  //         onSuccess: () => {
  //           toast.success("Campaign deleted successfully");
  //           refetch();
  //           toggleModal(defaultModal);
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
      <PageHeader />
      <Table
        tableColumns={columns}
        tableData={beautifiedData}
        // topRender={
        //   <div className="m-2 w-fit">
        //     <InputForm placeholder="Search..." />
        //   </div>
        // }
        // isLoading={isLoading}
        toggleModal={toggleModal}
        noDataFound={!beautifiedData || beautifiedData.length === 0}
      />
      {/* <DeleteModal
        open={openModal.state}
        onClose={() => toggleModal(defaultModal)}
        label="campaign"
        onSubmit={onClickOnDelete}
      /> */}
    </div>
  );
};

export default Index;
