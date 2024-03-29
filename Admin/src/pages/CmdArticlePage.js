import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { PDFDownloadLink } from '@react-pdf/renderer';



// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Button,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
} from '@mui/material';
import ReceiptPDF from './PaiementRecieptPdf'; // Import the ReceiptPDF component
// components
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';

// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';

import { getCmdArticles, deleteCmdArticle } from '../api/cmdarticle'


// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'numero', label: 'No', alignRight: false },
  { id: 'date', label: 'Date', alignRight: false },
  { id: 'client', label: 'Client', alignRight: false },
  { id: 'tel', label: 'Télephone', alignRight: false },
  { id: 'livraison', label: 'Livraison', alignRight: false },
  { id: 'etat', label: 'Etat', alignRight: false },
  { id: 'prixtotal', label: 'Prix Total', alignRight: false },
  { id: 'versement', label: 'Versement', alignRight: false },
  { id: 'paye', label: 'Payé', alignRight: false },
  { id: 'download', label: '', alignRight: true },
  { id: 'edit', label: '', alignRight: true },
  { id: 'delete', label: '', alignRight: true },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}


function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  if (query) {
    const filteredArray = stabilizedThis.filter((item) => {
      const lowerQuery = query.toLowerCase();
      const lowerNo = item[0].numero.toLowerCase();
      const lowerNom = `${item[0].client.nom} ${item[0].client.prenom}`.toLowerCase();
      return lowerNo.includes(lowerQuery) || lowerNom.includes(lowerQuery);
    });
    return filteredArray.map((el) => el[0]);
  }

  return stabilizedThis.map((el) => el[0]);
}

export default function UserPage() {

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('nom');

  const [filterName, setFilterName] = useState('');

  const [cmdarticles, setCmdArticles] = useState([]);

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getCmdArticles()
      .then((res) => {
        setCmdArticles(res.data)
        setLoading(false)
      })
      .catch(err => console.error(err));
  }, []);


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = cmdarticles.map((n) => n.firstname);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleDelete = (cmdarticleID) => {
    deleteCmdArticle(cmdarticleID)
      .then(() => {
        setCmdArticles(cmdarticles.filter((cmdarticle) => cmdarticle._id !== cmdarticleID));
      })
      .catch((error) => {
        console.error(error);
      });
  };



  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - cmdarticles.length) : 0;

  const filteredAdmins = applySortFilter(cmdarticles, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredAdmins.length && !!filterName;


  return (
    <>
      <Helmet>
        <title> Commande d'achat d'article Page </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Commandes d'achat d'articles
          </Typography>
          <Link to="/dashboard/create-cmdarticle">
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
              Ajouter Commande d'achat
            </Button>
          </Link>
        </Stack>

        <Card>
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer component={Paper}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={cmdarticles.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={6} align="center">
                        Loading...
                      </TableCell>
                    </TableRow>
                  ) : isNotFound ? (
                    <TableRow>
                      <TableCell colSpan={6} align="center">
                        No matching records found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredAdmins
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((cmdarticle) => {
                        const formattedDate = format(new Date(cmdarticle.created_at), 'dd/MM/yyyy HH:mm:ss');
                        const { _id, numero, client, livraison, etat, prixtotal, paye, articles, versement } = cmdarticle;
                        const isItemSelected = selected.indexOf(_id) !== -1;
                        const generateReceiptData = {
                          No: cmdarticle.numero,
                          ClientNom: cmdarticle.client ? cmdarticle.client.nom || 'N/A' : 'N/A',
                          ClientPrenom: cmdarticle.client ? cmdarticle.client.prenom || 'N/A' : 'N/A',
                          ClientEntreprise: cmdarticle.client ? cmdarticle.client.entreprise || 'N/A' : 'N/A',
                          Versement: cmdarticle.versement,
                          Prix: cmdarticle.prixtotal,
                          Solde: cmdarticle.client ? cmdarticle.client.solde || 'N/A' : 'N/A',
                        };


                        return (
                          <TableRow hover key={_id} tabIndex={-1} role="checkbox" selected={isItemSelected}>


                            <TableCell align="left">
                              <Stack direction="row" alignItems="center" spacing={1}>

                                {numero}
                              </Stack>
                            </TableCell>
                            <TableCell align="left">{formattedDate}</TableCell>
                            <TableCell align="left">
                              {client && client.nom && client.prenom ? `${client.nom} ${client.prenom}` : 'N/A'}
                            </TableCell>
                            <TableCell align="left">
                              {client && client.tel ? `${client.tel}` : 'N/A'}
                            </TableCell>
                            <TableCell align="left">{livraison}</TableCell>
                            <TableCell align="left">{etat}</TableCell>
                            <TableCell align="left">{prixtotal} DA</TableCell>
                            <TableCell align="left">{versement} DA</TableCell>
                            <TableCell align="left">{paye}</TableCell>
                            <TableCell align="right">
                              {paye === 'Non Payé' ? (
                                null // Render nothing if "" is "Non Payé"
                              ) : (
                                <PDFDownloadLink
                                  document={<ReceiptPDF data={generateReceiptData} articles={articles} entreprise={client?.entreprise} />}
                                  fileName={`payment_receipt_${numero}.pdf`}
                                >
                                  {({ url, loading }) => (
                                    loading ? 'Téléchargement en cours...' : (
                                      <IconButton
                                        variant="contained"
                                        color="secondary"
                                        component="a"
                                        href={url}
                                        target="_blank"
                                        download={`payment_receipt_${numero}.pdf`}
                                      >
                                        <Iconify icon="ant-design:download-outlined" width={20} height={20} />
                                      </IconButton>
                                    )
                                  )}
                                </PDFDownloadLink>
                              )}



                              <Link to="/dashboard/pay-cmdarticle" state={{
                                id: _id,
                                cmdarticle,
                                ClientNom: client?.nom || 'N/A',
                                ClientPrenom: client?.prenom || 'N/A',
                                ClientTel: client?.tel || 'N/A',
                                ClientSolde: client?.solde || 'N/A',
                                ClientEntreprise: client?.entreprise || 'N/A',
                                Livraison: livraison || 'N/A',
                                Etat: etat || 'N/A',
                                Prix: prixtotal || 'N/A',
                                Paye: paye || 'N/A',
                                Versement: versement,
                                Articles: articles
                              }}>
                                {paye !== "Payé" && paye !== "Payé Partiellement" && (
                                  <IconButton style={{ color: "green" }}>
                                    <Iconify icon="uiw:pay" width={20} height={20} />
                                  </IconButton>
                                )}
                              </Link>
                              <IconButton style={{ color: "red" }} onClick={() => {
                                if (window.confirm('Are you sure you want to delete this admin?')) {
                                  handleDelete(cmdarticle._id);
                                }
                              }}>
                                <Iconify icon="ant-design:delete-filled" width={20} height={20} />
                              </IconButton>


                              <Link to="/dashboard/voir-cmdarticle" state={{
                                id: _id,
                                cmdarticle,
                                ClientNom: client?.nom || 'N/A',
                                ClientPrenom: client?.prenom || 'N/A',
                                ClientTel: client?.tel || 'N/A',
                                ClientSolde: client?.solde || 'N/A',
                                ClientEntreprise: client?.entreprise || 'N/A',
                                Livraison: livraison || 'N/A',
                                Etat: etat || 'N/A',
                                Prix: prixtotal || 'N/A',
                                Paye: paye || 'N/A',
                                Versement: versement,
                                Articles: articles
                              }}>
                                <IconButton style={{ color: "purple" }}>
                                  <Iconify icon="iconoir:eye" width={20} height={20} />
                                </IconButton>
                              </Link>
                              <Link to="/dashboard/update-cmdarticle" state={{
                                id: _id,
                                cmdarticle,
                                ClientNom: client?.nom || 'N/A',
                                ClientPrenom: client?.prenom || 'N/A',
                                ClientTel: client?.tel || 'N/A',
                                ClientSolde: client?.solde || 'N/A',
                                ClientEntreprise: client?.entreprise || 'N/A',
                                Livraison: livraison || 'N/A',
                                Etat: etat || 'N/A',
                                Prix: prixtotal || 'N/A',
                                Paye: paye || 'N/A',
                                Versement: versement,
                                Articles: articles
                              }}>
                                {paye !== "Payé" && paye !== "Payé Partiellement" && (
                                  <IconButton style={{ color: "orange" }}>
                                    <Iconify icon="ant-design:edit-filled" width={20} height={20} />
                                  </IconButton>
                                )}
                              </Link>

                            </TableCell>
                          </TableRow>
                        );
                      })
                  )}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={cmdarticles.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>


    </>
  );
}
