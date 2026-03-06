import connectDB from "./db";
import { Board, Column } from "./models";

const DEFUALT_COLUMNS = [
  { name: "Wish List", order: 0 },
  { name: "Applied", order: 1 },
  { name: "Interviewing", order: 2 },
  { name: "Offers", order: 3 },
  { name: "Rejected", order: 4 },
  { name: "Accepted", order: 5 },
];

export async function initializeUserBoard(userId: string) {
  try {
    await connectDB();

    //Check if boards exist

    const existingBoard = await Board.findOne({ userId, name: "Job Hunt" });

    if (existingBoard) {
      return existingBoard;
    }

    const board = await Board.create({
      name: "Job Hunt",
      userId,
      columns: [],
    });

    //Create the board
    const columns = await Promise.all(
      DEFUALT_COLUMNS.map((col) =>
        Column.create({
          name: col.name,
          order: col.order,
          boardId: board._id,
          jobAppliaction: [],
        }),
      ),
    );

    //Update board with columns
    board.columns = columns.map((col) => col._id);
    await board.save();

    return board;
  } catch (err) {
    throw err;
  }
}
