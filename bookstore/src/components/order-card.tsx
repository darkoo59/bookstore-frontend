import { List } from "@mui/material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import * as React from "react";
import { MyOrder } from "../model/my-order";
import { formatCurrency } from "../utilities/formatCurrency";

export function OrderCard({ order } : {order : MyOrder}) {
    return (
      <Card variant="outlined" className="card">
        <CardContent>
          <List>
                {
                  order.items.map((item) => (
                    <div>
                        <React.Fragment key={item.id}>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {item.title} - {item.author} ({formatCurrency(item.price)})    x{item.quantity}
                        </Typography>
                        </React.Fragment>
                    </div>
                  ))
                }
            </List>
            <Typography variant="h5" component="div" className="d-flex justify-content-between align-items-baseline mb-4">
                        Price(with discount) : {formatCurrency(order.price)}
            </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {/* {book.author} */}
          </Typography>
          <Typography variant="body2">
            {/* <i>Publisher: </i>{book.publisher} */}
          </Typography>
          <Typography variant="body2">
            {/* <i>Number of pages: </i>{book.numberOfPages} */}
          </Typography>
        </CardContent>
      </Card>
    );
  }