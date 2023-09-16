import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";

interface NavListItemProps {
  to: string;
  target?: string;
  primary: string;
  icon?: React.ReactElement;
  buttonProps?: {
    selected: boolean;
    onClick: () => void;
  };
}

function NavListitem({
  to,
  target,
  primary,
  icon,
  buttonProps,
}: NavListItemProps) {
  return (
    <ListItem
      component={Link}
      to={to}
      target={target}
      disablePadding
      sx={{ pb: "2px" }}
    >
      <ListItemButton
        {...buttonProps}
        sx={{
          paddingLeft: "12px",
          "&.Mui-selected": {
            backgroundColor: "rgba(68,165,254,0.12)",
            borderRadius: "9px",
          },
          ":hover": {
            backgroundColor: "rgba(68,165,254,0.12)",
            borderRadius: "9px",
          },
        }}
      >
        {icon && <ListItemIcon color="black" sx={{ minWidth: "44px" }} style={{ color: 'red !important' }}>{icon}</ListItemIcon>}
        <ListItemText
          primary={primary}
          primaryTypographyProps={{
            color: "black",
            fontWeight: "300",
            fontSize: 15,
          }}
          sx={{ lineHeight: 1, margin: 0 }}
        />
      </ListItemButton>
    </ListItem>
  );
}
export default NavListitem;
