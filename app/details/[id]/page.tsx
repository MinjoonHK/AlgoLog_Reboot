import connectDB from "@/database/db";
import { Button, Card, Divider } from "antd";
import { ObjectId } from "mongodb";
import MarkDown from "./markDownContent";
import DeleteButton from "./deleteButton";
import CommentForm from "./commentForm";

async function Detail(props: any) {
  const db = (await connectDB).db("algolog");
  let result = await db
    .collection("post")
    .findOne({ _id: new ObjectId(props.params.id) });
  return (
    <div style={{ marginLeft: "20%", marginRight: "20%", paddingTop: "5%" }}>
      <DeleteButton userEmail={result.authorEmail} />
      <Card
        style={{
          border: "transparent",
        }}
        title={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <h1>{result.title}</h1>
          </div>
        }
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}></div>
        <MarkDown result={result.content} />
      </Card>
      <Divider style={{ border: "1px solid rgb(45,45,45)" }} />
      <div>
        <CommentForm />
      </div>
    </div>
  );
}

export default Detail;
