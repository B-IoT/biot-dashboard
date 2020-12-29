import { Card as MaterialCard } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";

export default function CustomCard(props) {
  return (
    <MaterialCard className={props.className} style={props.style}>
      <CardContent>{props.children}</CardContent>
    </MaterialCard>
  );
}
