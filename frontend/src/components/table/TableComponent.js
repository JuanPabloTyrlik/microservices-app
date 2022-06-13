import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

export default function TableComponent() {
  const [coins, setCoins] = useState([]);

  const fetchTopCoins = async () => {
    const {
      data: { coins: newCoins },
    } = await axios.get("http://localhost:3000/api/top-coins");
    setCoins(newCoins);
  };

  useEffect(() => {
    fetchTopCoins();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Rank (7d)</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Symbol</TableCell>
            <TableCell>Price (7d)</TableCell>
            <TableCell>Market Cap (7d)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {coins.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.rank} ({row["7d"].rank})
              </TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.symbol}</TableCell>
              <TableCell>
                {row.price} ({row["7d"].price})
              </TableCell>
              <TableCell>
                {row.marketCap} ({row["7d"].marketCap})
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
