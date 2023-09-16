import { Toolbar, IconButton, Divider, Typography, Box } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import { styled } from "@mui/material/styles";
import { DRAWER_WIDTH, THEME_COLOR } from "./constants";

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }: any) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: DRAWER_WIDTH,
        width: `calc(100% - ${DRAWER_WIDTH}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

function TopBar({ open, setOpen }: any) {
    return (
        <>
            {open && (
                <AppBar
                    position="fixed"
                    sx={{
                        backgroundColor: THEME_COLOR,
                    }}
                >
                    {/* AppBar content */}
                    {/* <Toolbar variant="dense">
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={() => setOpen(!open)}
                            edge="start"
                            sx={{
                                marginRight: 5,
                                ...(open && { display: "none" }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Box
                            sx={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <Divider
                                    orientation="vertical"
                                    sx={{ backgroundColor: "white", mx: 1, height: "18px" }}
                                />
                                <Typography variant="h6">ParkIt</Typography>
                            </Box>
                        </Box>
                    </Toolbar> */}
                </AppBar>
            )}
            <Toolbar variant="dense">
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={() => setOpen(!open)}
                    edge="start"
                    sx={{
                        marginRight: 5,
                        ...(open && { display: 'none' }),
                    }}
                >
                    <MenuIcon />
                </IconButton>
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Divider
                            orientation="vertical"
                            sx={{ backgroundColor: 'white', mx: 1, height: '18px' }}
                        />
                        <Typography variant="h6">ParkIt</Typography>
                    </Box>
                </Box>
            </Toolbar>
        </>
    );
}

export default TopBar;