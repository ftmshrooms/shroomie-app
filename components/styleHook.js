import { makeStyles } from '@material-ui/core/styles';

const globalUseStyles = makeStyles(() => ({
    mintButton: {
        color: '#fff',
        background: '#006b94',
        border: '1px solid #006b94',
        marginTop: 10,
        fontSize: 20,
        fontFamily: "Roboto",
        letterSpacing: 10,
        fontWeight: 700,
        '&:hover': {
            background: '#00445f',
            color: '#fff',
            borderColor: "#00445f"
        },
        '&:disabled': {
            color: 'transparent',
            background: '#004964',
            border: '1px solid #004964',
        },
        '& span': {
            color: "#fff",
            width: 20,
            height: 20
        }
    },
    connectButton: {
        color: '#fff',
        background: '#006b94',
        border: '1px solid #006b94',
        fontSize: 12,
        fontFamily: "Roboto Slab",
        letterSpacing: 4,
        fontWeight: 700,
        borderRadius: 30,
        paddingLeft: 20,
        paddingRight: 20,
        '&:hover': {
            background: '#00445f',
            color: '#fff',
            borderColor: "#00445f"
        },
        '&:disabled': {
            color: '#fff',
            background: '#006b94',
            border: '1px solid #006b94',
        }
    },
    greentButton: {
        color: '#fff',
        background: '#006b94',
        border: '1px solid #004964 !important',
        width: 30,
        '&:hover': {
            background: '#00445f',
            color: '#fff',
            borderColor: "#00445f"
        },
        '&:disabled': {
            color: 'transparent',
            background: '#004964',
            border: '1px solid #004964',
        },
        '& span': {
            color: "#fff",
            width: 20,
            height: 20
        }
    },
    totalText: {
        fontSize: 18,
        fontWeight: "bold",
        fontFamily: "Roboto",
        color: "#fff",
        marginBottom: 15,
        letterSpacing: 1,
        display: "flex",
        fontFamily: "Roboto ",
        alignItems: "center",
        justifyContent: "center"
    },
    alertTitle: {
        fontSize: 42,
        color: "#333",
        fontFamily: "Roboto",
        marginBottom: 15,
        letterSpacing: 1,
        fontWeight: 900,
        fontFamily: "Roboto Slab"
    },
    alertText: {
        fontSize: 16,
        fontWeight: "bold",
        fontFamily: "Roboto",
        textTransform: "uppercase",
        color: "#333",
        marginBottom: 15,
        letterSpacing: 1
    },
    amountLabel: {
        fontSize: 16,
        fontWeight: "bold",
        fontFamily: "Roboto",
        color: "#fff",
        marginTop: 10,
        marginBottom: 10,
        letterSpacing: 1
    },
    amountText: {
        fontSize: 14,
        fontWeight: "bold",
        fontFamily: "Roboto",
        color: "#fff",
        marginTop: 5,
        marginBottom: 10,
        letterSpacing: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    amountCount: {
        fontSize: 28,
        fontWeight: "bold",
        fontFamily: "Roboto",
        color: "#fff",
        letterSpacing: 1
    },
    balanceLabel: {
        fontSize: 14,
        fontWeight: 500,
        fontFamily: "Roboto",
        color: "#fff",
        letterSpacing: 1
    },
    balanceText: {
        fontSize: 18,
        fontWeight: "bold",
        fontFamily: "Roboto",
        color: "#fff",
        letterSpacing: 1,
        display: "flex",
        alignItems: "center",
        '& span': {
            fontSize: 14
        }

    },
    tooltipTitle: {
        fontSize: 14,
        fontFamily: "Roboto",
        fontWeight: 500,
        color: "#fff"
    },
    tooltipText: {
        fontSize: 12,
        fontFamily: "Roboto",
        fontWeight: 200,
        color: "#fff",
        lineHeight: 2
    },
    linkButton: {
        fontSize: 18,
        fontWeight: 700,
        fontFamily: "Roboto Slab",
        color: "#fff",
        marginRight: 20
    },
    backButton: {
        fontSize: 16,
        fontWeight: 700,
        fontFamily: "Roboto",
        color: "#fff",
        marginRight: 20,
        borderColor: "#fff",
        borderRadius: 20,
        position: "relative",
        zIndex: 4,
        marginTop: 20
    },
    cardTitle: {
        fontSize: 16,
        color: "#fff",
        fontWeight: 800,
        fontFamily: "Roboto",
        maxWidth: 240,
        padding: "15px 10px",
        position: "relative",
        background: "#000000b8",
        position: "absolute",
        width: "100%",
        bottom: 0,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    },
    cardDescription: {
        fontSize: 13,
        fontFamily: "Roboto",
        color: "#000",
        maxWidth: 240,
        padding: 10,
        height: 60,
        position: "relative",
        "&::after": {
            content: "",
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: 20,
            background: "#fff"
        }

    },
    cardDescriptionOpen: {
        fontSize: 13,
        color: "#000",
        fontFamily: "Roboto",
        maxWidth: 240,
        padding: 10,
        height: "auto"
    },
    listTitle: {
        fontSize: 30,
        color: "#fff",
        fontFamily: "Roboto",
        height: "auto",
        fontWeight: 900,
        position: "relative",
        zIndex: 3,
        paddingBottom: 20,
        textAlign: 'center',
        borderBottom: "1px solid #ffffff3b",
        marginBottom: 30,
        "& span": {
            fontSize: 24,
            marginLeft: 10
        }
    },
    emptyText: {
        fontSize: 20,
        color: "#fff",
        height: "auto",
        fontWeight: 900,
        position: "relative",
        zIndex: 3,
        paddingTop: 20,
        textAlign: 'center',
        marginBottom: 20,
        position: "relative",
        zIndex: 3
    }
}));

export default globalUseStyles