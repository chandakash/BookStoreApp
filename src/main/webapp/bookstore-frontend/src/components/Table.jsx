import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { visuallyHidden } from "@mui/utils";
import headCells from "../utils/tableHeads";
import { useState } from "react";
import { useEffect } from "react";
import BookService from "../services/BookService";
import { InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { makeStyles } from "@mui/styles";
import { useCallback } from "react";

const useStyles = makeStyles((theme) => ({
  searchpaper: {
    backgroundColor: theme.palette.primary.dark,
    height: "30px",
    marginLeft: theme.spacing(1),
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 200,
    border: `1px solid ${theme.palette.secondary.main}`,
  },
}));

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow style={{ background: "gray"}}>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            // align={headCell.numeric ? "right" : "left"}
            align={"center"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const { numSelected, setRows, setTotalPage, setTotalCount } = props;
  const [searchBy, setSearchBy] = useState("Akash Chand");
  const classes = useStyles();

  const debounce = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 1000);
    };
  };
  const handleSearch = async (e) => {
    try {
      const fetchData = async () => {
        // const response = await axios.get(`${SERVER_URL}/${ROLL_NUMBER}/SearchData?DocId=${e.target.value}`)
        // console.log(searchBy);
        setSearchBy(e.target.value);
        var response;
        if(e.target.value!==""){
          response = await BookService.getFilterData(e.target.value);
        }else{
          response = await BookService.getAll(0,5,"asc","title")
        }
        // console.log(response);
        setTotalPage(response.data.totalPages);
        setTotalCount(response.data.totalElements);
        setRows(response.data.content);
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const optimisedSearch = useCallback(debounce(handleSearch), []);

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      <Typography
        sx={{ flex: "1 1 100%" }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        BOOK LIST
      </Typography>
      <Paper
        component="form"
        className={classes.searchpaper}
        // alignItems="center"
      >
        <InputBase
          className={classes.input}
          placeholder="Search..."
          inputProps={{
            "aria-label": "Search by Any",
            size: "small",
          }}
          onChange={optimisedSearch}
        />
        <IconButton
          type="submit"
          // className={classes.iconButton}
          aria-label="search"
        >
          <SearchIcon color="primary" fontSize="small" />
        </IconButton>
      </Paper>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable({ selectedData, setSelectedData }) {
  const [rows, setRows] = useState([]);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("title");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalPage, setTotalPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const fetchData = async () => {
    try {
      const result = await BookService.getAll(
        page,
        rowsPerPage,
        order,
        orderBy
      );
      setTotalPage(result.data.totalPages);
      setTotalCount(result.data.totalElements);
      setRows(result.data.content);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchData();

    return () => {};
  }, []);

  useEffect(() => {
    fetchData();
  }, [page, rowsPerPage, order, orderBy]);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, row) => {
    const name = row.bookId;
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
    console.log("row : ", row);

    // to find the selected data.
    if (selectedData.find((element) => element.bookId === row.bookId)) {
      setSelectedData(
        selectedData.filter((element) => element.bookId !== row.bookId)
      );
    } else {
      setSelectedData((selectedData) => [...selectedData, row]);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (bookId) => selected.indexOf(bookId) !== -1;
  return (
    <Box sx={{ width: "100%" }} style={{ padding: "0px 20px" }}>
      <Paper sx={{ width: "100%" }} style={{ background: "cyan" }}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          setRows={setRows}
          setTotalPage={setTotalPage}
          setTotalCount={setTotalCount}
        />
        <TableContainer>
          <Table
            // sx={{ minWidth: 750}}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
            style={{ height: "45vh", display: "block", overflow: "scroll"}}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows ? rows.length : 0}
            />
            <TableBody>
              {rows.map((row, index) => {
                const isItemSelected = isSelected(row.bookId);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.bookId}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                      align="left"
                    >
                      {row.title}
                    </TableCell>
                    <TableCell align="left">{row.author}</TableCell>
                    <TableCell align="left">
                      <a
                        href={row.coverPhotoURL}
                        target="black"
                        style={{ textDecoration: "none" }}
                      >
                        {row.coverPhotoURL}
                      </a>
                    </TableCell>
                    <TableCell align="left">{row.isbnNumber}</TableCell>
                    <TableCell align="left">{row.language}</TableCell>
                    <TableCell align="left">{row.genre}</TableCell>
                    <TableCell align="left">{row.publishedDate}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={totalCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
}
