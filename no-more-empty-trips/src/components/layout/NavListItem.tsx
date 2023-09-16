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
            backgroundColor: "rgba(255,48,48,0.12)",
            borderRadius: "9px",
          },
          ":hover": {
            backgroundColor: "rgba(255,48,48,0.12)",
            borderRadius: "9px",
          },
        }}
      >
        {icon && <ListItemIcon sx={{ minWidth: "44px" }}>{icon}</ListItemIcon>}
        <ListItemText
          primary={primary}
          primaryTypographyProps={{
            color: "white",
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
