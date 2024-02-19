import { pool } from "../database/connection.js";

const ListOlderAdults = async () => {
  try {
    const query = "SELECT listolderadults()";
    const { rows } = await pool.query(query);
    return rows[0].listolderadults;
  } catch (error) {
    console.log("Error en la consulta a la BD: " + error);
  }
};

const FindAllRepOlderByEmail = async (email) => {
  try {
    const query = "SELECT listallrepresentativeolderadult($1)";
    const { rows } = await pool.query(query, [email]);
    return rows[0].listallrepresentativeolderadult;
  } catch (error) {
    console.log("Error en la consulta a la BD: " + error);
  }
};

// QUERY VALIDATE LOGIN
const FindLogin = async (email, password) => {
  try {
    const query = "SELECT loginvalidate($1, $2)";
    const { rows } = await pool.query(query, [email, password]);
    return rows[0].loginvalidate;
  } catch (error) {
    console.log("Error en la consulta a la BD: " + error);
  }
};

const IsValidEmail = async (email) => {
  try {
    const query = "SELECT isexistemail($1)";
    const { rows } = await pool.query(query, [email]);
    return rows[0].isexistemail;
  } catch (error) {
    console.log("Error en la consulta a la BD: " + error);
  }
};

const IsValidIdCardAdult = async (idCard) => {
  try {
    const query = "SELECT isexistidcardadult($1)";
    const { rows } = await pool.query(query, [idCard]);
    return rows[0].isexistidcardadult;
  } catch (error) {
    console.log("Error en la consulta a la BD: " + error);
  }
};

const ChangePassword = async (email, newPassword) => {
  try {
    const query = "CALL changepasswordcredential($1, $2)";
    const { rows } = await pool.query(query, [email, newPassword]);
    return rows;
  } catch (error) {
    console.log("Error en la consulta a la BD: " + error);
  }
};

// QUERY REGISTER DATA
const RegisterAdministrator = async (
  ad_idcard,
  ad_names,
  ad_lastnames,
  ad_gender,
  ad_cargo,
  ad_contacto,
  ad_email,
  ad_password
) => {
  try {
    const query =
      "SELECT functaddadministrator($1, $2, $3, $4, $5, $6, $7, $8)";
    const { rows } = await pool.query(query, [
      ad_idcard,
      ad_names,
      ad_lastnames,
      ad_gender,
      ad_cargo,
      ad_contacto,
      ad_email,
      ad_password,
    ]);
    return rows[0].functaddadministrator;
  } catch (error) {
    console.log("Error en la consulta a la BD: " + error);
  }
};

const RegisterOlderAdult = async (
  rp_idcard,
  oa_idcard,
  oa_names,
  oa_lastnames,
  oa_gender,
  oa_birthdate,
  oa_enfermedad,
  cr_correo,
  cr_password
) => {
  try {
    const query =
      "SELECT functaddolderadult($1, $2, $3, $4, $5, $6, $7, $8, $9)";
    const { rows } = await pool.query(query, [
      rp_idcard,
      oa_idcard,
      oa_names,
      oa_lastnames,
      oa_gender,
      oa_birthdate,
      oa_enfermedad,
      cr_correo,
      cr_password,
    ]);
    return rows[0].functaddolderadult;
  } catch (error) {
    console.log("Error en la consulta a la BD: " + error);
  }
};

const RegisterRepresentative = async (
  rp_idcard,
  rp_names,
  rp_lastnames,
  rp_gender,
  rp_parentesco,
  rp_contacto
) => {
  try {
    const query = "SELECT functaddrepresentantive($1, $2, $3, $4, $5, $6)";
    const { rows } = await pool.query(query, [
      rp_idcard,
      rp_names,
      rp_lastnames,
      rp_gender,
      rp_parentesco,
      rp_contacto,
    ]);
    return rows[0].functaddrepresentantive;
  } catch (error) {
    console.log("Error en la consulta a la BD: " + error);
  }
};

// QUERY EDIT DATA
const EditRepresentative = async (
  rp_idusuario,
  rp_idcard,
  rp_names,
  rp_lastnames,
  rp_gender,
  rp_parentesco,
  rp_contacto
) => {
  try {
    const query = "SELECT functeditrepresentative($1, $2, $3, $4, $5, $6, $7)";
    const { rows } = await pool.query(query, [
      rp_idusuario,
      rp_idcard,
      rp_names,
      rp_lastnames,
      rp_gender,
      rp_parentesco,
      rp_contacto,
    ]);
    return rows[0].functeditrepresentative;
  } catch (error) {
    console.log("Error en la consulta a la BD: " + error);
  }
};

const EditOlderAdult = async (
  oa_idusuario,
  oa_idcard,
  oa_names,
  oa_lastnames,
  oa_gender,
  oa_birthdate,
  oa_enfermedad
) => {
  try {
    const query = "SELECT functeditolderadult($1, $2, $3, $4, $5, $6, $7)";
    const { rows } = await pool.query(query, [
      oa_idusuario,
      oa_idcard,
      oa_names,
      oa_lastnames,
      oa_gender,
      oa_birthdate,
      oa_enfermedad,
    ]);
    return rows[0].functeditolderadult;
  } catch (error) {
    console.log("Error en la consulta a la BD: " + error);
  }
};

export const nutrihealthModel = {
  ListOlderAdults,
  FindAllRepOlderByEmail,
  FindLogin,
  IsValidEmail,
  IsValidIdCardAdult,
  ChangePassword,
  RegisterAdministrator,
  RegisterOlderAdult,
  RegisterRepresentative,
  EditRepresentative,
  EditOlderAdult,
};
