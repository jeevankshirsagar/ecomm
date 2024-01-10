import { Eye } from "@styled-icons/bootstrap";
import { useEffect, useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import { useSelector } from "react-redux";
import useSWR from "swr";
import classes from "~/components/tableFilter/table.module.css";
import { dateFormat, fetchData } from "~/lib/clientFunctions";
import FilterComponent from "../../components/tableFilter";
import Spinner from "../../components/Ui/Spinner";
import PurchaseDetails from "./PurchaseDetails";
import { useTranslation } from "react-i18next";




const PurchaseHistory = (props) => {
  const url = `/api/profile?id=${props.id}`;
  const { data, error, mutate } = useSWR(props.id ? url : null, fetchData);
  const [userData, setUserData] = useState([]);
  const settings = useSelector((state) => state.settings);
  const { t } = useTranslation();
  useEffect(() => {
    if (data && data.user) {
      setUserData(data.user.orders);
    }
  }, [data]);

  // cssforcards

  // const cardStyle = {
  //   width: "200px",
  //   height: "150px", 
  //   margin: "10px",
  //   display: "inline-block",
  //   border: "2px solid #ffA500", 
  //   borderRadius: "8px",
  //   boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  //   transition: "box-shadow 0.3s ease-in-out",
  // };

  // const hoverStyle = {
  //   boxShadow: "0 8px 16px rgba(0, 0, 0, 0.4)",
  // };

  // const cardContainerStyle = {
  //   display: "flex",
  //   justifyContent: "space-around",
  // };

  // const cardBodyStyle = {
  //   display: "flex",
  //   flexDirection: "column",
  //   alignItems: "center",
  //   justifyContent: "center",
  //   height: "100%",
  // };

  // const cardTitleStyle = {
  //   fontSize: "25px",
  //   fontWeight: "bold",
  //   marginBottom: "8px",
  // };

  // const cardTextStyle = {
  //   fontSize: "16px",
  //   color: "#666",
  // };




  

  const [showDetails, setShowDetails] = useState(false);
  const [detailsData, setDetailsData] = useState(null);

  function showPurchaseDetails(id) {
    const _data = userData.find((d) => d.orderId === id);
    setDetailsData(_data);
    setShowDetails(true);
  }

  function hidePurchaseDetails() {
    setDetailsData(null);
    setShowDetails(false);
  }

  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const filteredItems = userData.filter(
    (item) =>
      item.orderId &&
      item.orderId.toLowerCase().includes(filterText.toLowerCase())
  );

  const subHeaderComponentMemo = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };
    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
        placeholder="Tracking Number"
      />
    );
  }, [filterText, resetPaginationToggle]);

  const columns = [
    {
      name: t("Request Number"),
      selector: (row) => row.orderId,
      grow: 1.5,
    },
    {
      name: t("date"),
      selector: (row) => dateFormat(row.orderDate),
      sortable: true,
    },
    {
      name: t("Due"),
      selector: (row) => settings.settingsData.currency.symbol + row.payAmount,
    },
    {
      name: t("delivery_status"),
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: t("payment_status"),
      selector: (row) => row.paymentStatus,
      sortable: true,
    },
    {
      name: t("action"),
      selector: (row) => (
        <div className={classes.button}>
          <Eye
            width={20}
            height={20}
            title="view"
            // onClick={() => showPurchaseDetails(row.orderId)}
          />
        </div>
      ),
    },
  ];

  const customStyles = {
    rows: {
      style: {
        minHeight: "92px",
        fontSize: "15px",
      },
    },
    headCells: {
      style: {
        fontSize: "15px",
      },
    },
  };

  return (

    
    <>
    {/* <div style={cardContainerStyle}>
      <Card style={{ ...cardStyle, ...hoverStyle }}>
        <Card.Body style={cardBodyStyle}>
          <Card.Title style={cardTitleStyle}>4000</Card.Title>
          <Card.Text style={cardTextStyle}>
          Dues
          </Card.Text>
        </Card.Body>
      </Card>

      <Card style={{ ...cardStyle, ...hoverStyle }}>
        <Card.Body style={cardBodyStyle}>
          <Card.Title style={cardTitleStyle}>250</Card.Title>
          <Card.Text style={cardTextStyle}>
          Request
          </Card.Text>
        </Card.Body>
      </Card>

      <Card style={{ ...cardStyle, ...hoverStyle }}>
        <Card.Body style={cardBodyStyle}>
          <Card.Title style={cardTitleStyle}>2</Card.Title>
          <Card.Text style={cardTextStyle}>
          Open Enquiry
          </Card.Text>
        </Card.Body>
      </Card>

      <Card style={{ ...cardStyle, ...hoverStyle }}>
        <Card.Body style={cardBodyStyle}>
          <Card.Title style={cardTitleStyle}>5</Card.Title>
          <Card.Text style={cardTextStyle}>
          Close Enquiry
          </Card.Text>
        </Card.Body>
      </Card>
    
      </div> */}
      {error ? (
        <div className="text-center text-danger">failed to load</div>
      ) : !data ? (
        <Spinner />
      ) : (
        <>
          <DataTable
            columns={columns}
            data={filteredItems}
            pagination
            paginationResetDefaultPage={resetPaginationToggle}
            subHeader
            subHeaderComponent={subHeaderComponentMemo}
            persistTableHead
            customStyles={customStyles}
          />
          {showDetails && detailsData && (
            <PurchaseDetails
              data={detailsData}
              hide={hidePurchaseDetails}
              update={mutate}
            />
          )}
        </>
      )}
    </>
  );
};

export default PurchaseHistory;
