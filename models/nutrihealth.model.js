import { pool } from "../database/connection.js";

const findAllRepOlderByEmail = async (email) => {
  try {
    const query = "SELECT listallrepresentativeolderadult($1)";
    const { rows } = await pool.query(query, [email]);
    return rows[0].listallrepresentativeolderadult;
  } catch (error) {
    console.log("Error en la consulta a la BD: " + error);
  }
};

// QUERY VALIDATE LOGIN
const findLogin = async (email, password) => {
  try {
    const query = "SELECT loginvalidate($1, $2)";
    const { rows } = await pool.query(query, [email, password]);
    return rows[0].loginvalidate;
  } catch (error) {
    console.log("Error en la consulta a la BD: " + error);
  }
};

// QUERY REGISTER DATA
const registerAdministrator = async (
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

const registerOlderAdult = async (
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

const registerRepresentative = async (
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
const editRepresentative = async (
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
    return rows[0];
  } catch (error) {
    console.log("Error en la consulta a la BD: " + error);
  }
};

const editOlderAdult = async (
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
    return rows[0];
  } catch (error) {
    console.log("Error en la consulta a la BD: " + error);
  }
};

export const nutrihealthModel = {
  findAllRepOlderByEmail,
  findLogin,
  registerAdministrator,
  registerOlderAdult,
  registerRepresentative,
  editRepresentative,
  editOlderAdult,
};
