// //Chạy add order trên frontend của users:

// import React from "react";
// import { axiosClient } from "../../libraries/axiosClient";
// import {
//   Table,
//   Tag,
//   Space,
//   Popconfirm,
//   message,
//   Button,
//   Form,
//   Select,
//   Modal,
//   Input,
//   InputNumber,
//   Card,
//   Typography,
// } from "antd";
// import { DeleteOutlined, EyeOutlined, PlusOutlined } from "@ant-design/icons";
// import { API_URL } from "../../constants/URLS";
// import moment from "moment";
// import numeral from "numeral";
// const { Text } = Typography;

// function OrderManagement() {
//   //set useState:
//   const [orders, setOrders] = React.useState([]);
//   const [refresh, setRefresh] = React.useState(0);
//   const [products, setProducts] = React.useState([]);
//   const [customers, setCustomers] = React.useState([]);
//   const [selectedOrder, setSelectedOrder] = React.useState(null);
//   const [isVisibleAddNewForm, setIsVisibleAddNewForm] = React.useState(false);
//   const [isVisibleOrderDetail, setIsVisibleOrderDetail] = React.useState(false);

//   const orderColumns = [
//     {
//       title: "ORDER ID",
//       dataIndex: "orderID",
//       key: "orderID",
//       render: (text) => {
//         return <strong style={{ color: "blue" }}>{text}</strong>;
//       },
//     },
//     {
//       title: "CUSTOMER",
//       dataIndex: "customerName",
//       key: "customerName",
//       render: (text) => {
//         return <span>{text}</span>;
//       },
//     },
//     // {
//     //   title: "PRODUCT",
//     //   dataIndex: "product",
//     //   key: "product",
//     //   render: (text, record) => {
//     //     return <div>{record?.orderDetails[0]?.product?.name}</div>;
//     //   },
//     // },
//     {
//       title: "ORDER DATE",
//       dataIndex: "orderDate",
//       key: "orderDate",
//       render: (text) => {
//         return <span>{moment(text).format("DD/MM/yyyy")}</span>;
//       },
//     },
    // {
    //   title: "AMOUNT",
    //   dataIndex: "totalAmount",
    //   key: "totalAmount",
    //   render: (record) => {
    //     return (
    //       <div
    //         style={{ textAlign: "right", color: "green", fontWeight: "bold" }}
    //       >
    //         {numeral(record?.orderDetails[0]?.totalAmount).format("0,0$")}
    //       </div>
    //     );
    //   },
    // },
//     {
//       title: "PAYMENT METHOD",
//       key: "paymentMethod",
//       dataIndex: "paymentMethod",
//       render: (text) => {
//         return <span>{text}</span>;
//       },
//     },
//     {
//       title: "DELIVERY STATUS",
//       key: "deliveryStatus",
//       dataIndex: "deliveryStatus",
//       render: (text) => {
//         if (text === "Cancelled") {
//           return (
//             <Tag color="red" key={text}>
//               {text.toUpperCase()}
//             </Tag>
//           );
//         } else if (text === "Delivered") {
//           return (
//             <Tag color="green" key={text}>
//               {text.toUpperCase()}
//             </Tag>
//           );
//         } else if (text === "Pending") {
//           return (
//             <Tag color="yellow" key={text}>
//               {text.toUpperCase()}
//             </Tag>
//           );
//         } else if (text === "Inprogress") {
//           return (
//             <Tag color="blue" key={text}>
//               {text.toUpperCase()}
//             </Tag>
//           );
//         }
//         return (
//           <Tag color="purple" key={text}>
//             {text.toUpperCase()}
//           </Tag>
//         );
//       },
//     },
//     {
//       title: "ACTION",
//       key: "actions",
//       render: (text, record) => {
//         return (
//           <Space>
//             <Popconfirm
//               title="Are you sure to delete this order?"
//               onConfirm={() => {
//                 //Delete:
//                 const id = record._id;
//                 axiosClient
//                   .delete("/orders/" + id)
//                   .then((response) => {
//                     message.success("Delete Successful!");
//                     setRefresh((f) => {
//                       return f + 1;
//                     });
//                   })
//                   .catch((err) => {
//                     message.error("Delete Failed!");
//                   });
//                 console.log("Delete", record);
//               }}
//               onCancel={() => {}}
//               okText="Yes"
//               cancelText="No"
//             >
//               <Button type="dashed" danger icon={<DeleteOutlined />}></Button>
//             </Popconfirm>
//             <Button
//               type="dashed"
//               icon={<EyeOutlined />}
//               onClick={() => {
//                 setSelectedOrder(record);
//                 setIsVisibleOrderDetail(true);
//               }}
//             ></Button>
//           </Space>
//         );
//       },
//     },
//   ];

//   const fixedOrderDetailsColumns = [
//     {
//       title: "",
//       dataIndex: "imageUrl",
//       key: "imageUrl",
//       render: (text) => {
//         return (
//           <div>
//             {text && (
//               <img src={`${API_URL}${text}`} style={{ width: 60 }} alt="" />
//             )}
//           </div>
//         );
//       },
//     },
//     {
//       title: "PRODUCT NAME",
//       dataIndex: "product",
//       key: "product",
//       render: (text, record) => {
//         const { orderDetails } = record;

//         orderDetails &&
//           orderDetails.map((p) => {
//             return <div>{p.product.name}</div>;
//           });
//       },
//     },
//     {
//       title: "PRICE",
//       dataIndex: "product.price",
//       key: "product.price",
//       render: (record) => {
//         return (
//           <div style={{ textAlign: "right" }}>
//             {numeral(record?.product?.price).format("0,0$")}
//           </div>
//         );
//       },
//     },
//     {
//       title: "QUANTITY",
//       dataIndex: "quantity",
//       key: "quantity",
//       render: (text) => {
//         return <span>{numeral(text).format("0,0")}</span>;
//       },
//     },
//     {
//       title: "DISCOUNT",
//       dataIndex: "price.discount",
//       key: "price.discount",
//       render: (record) => {
//         return <span>{numeral(record?.product?.discount).format("0,0")}</span>;
//       },
//     },
//     {
//       title: "AMOUNT",
//       dataIndex: "totalAmount",
//       key: "totalAmount",
//       render: (text) => {
//         return (
//           <div
//             style={{ textAlign: "right", color: "green", fontWeight: "bold" }}
//           >
//             {numeral(text).format("0,0$")}
//           </div>
//         );
//       },
//     },
//   ];

//   //set useEffect:
//   //Orders:

//   React.useEffect(() => {
//     axiosClient
//       .get("/orders")
//       .then((response) => {
//         setOrders(response.data);
//       })
//       .catch((err) => {
//         console.log("🧨", err);
//       });
//   }, [refresh]);

//   //Products:
//   React.useEffect(() => {
//     axiosClient
//       .get("/products")
//       .then((response) => {
//         setProducts(response.data);
//       })
//       .catch((err) => {
//         console.log("🧨", err);
//       });
//   }, []);

//   //Customer:
//   React.useEffect(() => {
//     axiosClient
//       .get("/customers")
//       .then((response) => {
//         setCustomers(response.data);
//       })
//       .catch((err) => {
//         console.log("🧨", err);
//       });
//   }, []);

//   //Add new order:
//   const onFinish = () => {};

//   const onFinishFailed = () => {};

//   const [createForm] = Form.useForm();

//   return (
//     <div style={{ padding: "20px" }}>
//       {/* Add new order */}
//       <div className="d-flex justify-content-end my-5">
//         <Button
//           type="primary"
//           icon={<PlusOutlined />}
//           onClick={() => {
//             setIsVisibleAddNewForm(true);
//           }}
//           size="large"
//         >
//           Add New Order
//         </Button>
//       </div>

//       <Modal
//         centered
//         title="Add New Order"
//         open={isVisibleAddNewForm}
//         onOk={() => {
//           createForm.submit();
//           setIsVisibleAddNewForm(false);
//         }}
//         onCancel={() => {
//           setIsVisibleAddNewForm(false);
//         }}
//         okText="Submit"
//       >
//         <Form
//           form={createForm}
//           name="create-form"
//           labelCol={{ span: 8 }}
//           wrapperCol={{ span: 16 }}
//           initialValues={{ remember: true }}
//           onFinish={onFinish}
//           onFinishFailed={onFinishFailed}
//           autoComplete="on"
//         >
//           <Form.Item
//             label="OrderID"
//             name="orderID"
//             rules={[
//               {
//                 required: true,
//                 message: "Please input orderId!",
//               },
//             ]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             label="Customer"
//             name="customerId"
//             rules={[
//               {
//                 required: true,
//                 message: "Please input customer name!",
//               },
//             ]}
//           >
//             <Select
//               options={
//                 customers &&
//                 customers.map((c) => {
//                   return {
//                     value: c._id,
//                     label: c.fullName,
//                   };
//                 })
//               }
//             />
//           </Form.Item>
//           <Form.Item
//             label="Product"
//             name="productId"
//             rules={[
//               {
//                 required: true,
//                 message: "Please input product name!",
//               },
//             ]}
//           >
//             <Select
//               options={
//                 products &&
//                 products.map((c) => {
//                   return {
//                     value: c._id,
//                     label: c.name,
//                   };
//                 })
//               }
//             />
//           </Form.Item>
//           <Form.Item
//             label="Quantity"
//             name="quantity"
//             rules={[
//               {
//                 required: true,
//                 message: "Please input product quantity!",
//               },
//             ]}
//           >
//             <InputNumber style={{ minWidth: 200 }} />
//           </Form.Item>

//           <Form.Item
//             label="Payment Method"
//             name="paymentMethod"
//             rules={[
//               {
//                 required: true,
//                 message: "Please input payment method!",
//               },
//             ]}
//           >
//             <Input />
//           </Form.Item>
//         </Form>
//       </Modal>

//       {/* End of Add new order */}
//       <Table rowKey="_id" dataSource={orders} columns={orderColumns} />

//       {/* See order in details */}
//       <Modal
//         title="Order In Details"
//         centered
//         open={isVisibleOrderDetail}
//         onOk={() => {
//           setIsVisibleOrderDetail(false);
//         }}
//         onCancel={() => setIsVisibleOrderDetail(false)}
//         width={"90%"}
//       >
//         {selectedOrder &&
//           selectedOrder.orderDetails.map((p) => {
//             return (
//               <Card
//                 style={{
//                   width: 300,
//                 }}
//                 key={p._id}
//               >
//                 <p>{p?.product?.name}</p>
//               </Card>
//             );
//           })}
//       </Modal>
//       {/* End of order details */}
//     </div>
//   );
// }

// {
//   /* <Table
//   columns={columns}
//   dataSource={data}
//   pagination={false}
//   bordered
//   summary={(pageData) => {
//     let totalBorrow = 0;
//     let totalRepayment = 0;
//     pageData.forEach(({ borrow, repayment }) => {
//       totalBorrow += borrow;
//       totalRepayment += repayment;
//     });
//     return (
//       <>
//         <Table.Summary.Row>
//           <Table.Summary.Cell index={0}>Total</Table.Summary.Cell>
//           <Table.Summary.Cell index={1}>
//             <Text type="danger">{totalBorrow}</Text>
//           </Table.Summary.Cell>
//           <Table.Summary.Cell index={2}>
//             <Text>{totalRepayment}</Text>
//           </Table.Summary.Cell>
//         </Table.Summary.Row>
//         <Table.Summary.Row>
//           <Table.Summary.Cell index={0}>Balance</Table.Summary.Cell>
//           <Table.Summary.Cell index={1} colSpan={2}>
//             <Text type="danger">{totalBorrow - totalRepayment}</Text>
//           </Table.Summary.Cell>
//         </Table.Summary.Row>
//       </>
//     );
//   }}
// />; */
// }

// export default OrderManagement;
