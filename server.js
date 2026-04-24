const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('.'));  // sirve index.html desde la misma carpeta

// ── CONFIGURA TU CONEXIÓN AQUÍ ──────────────────────────────────────────────
const pool = new Pool({
  host:     'localhost',   // o la IP de tu servidor PostgreSQL
  port:     5432,
  database: 'distribuidora_db',   // cambia al nombre de tu base de datos
  user:     'postgres',   // cambia a tu usuario
  password: 'basesdedatoserick'        // cambia a tu contraseña
});
// ────────────────────────────────────────────────────────────────────────────

// Helper para manejar errores en todas las rutas
const q = (fn) => async (req, res) => {
  try { await fn(req, res); }
  catch (err) {
    console.error(err.message);
    res.status(400).json({ error: err.message });
  }
};


// ════════════════════════════════════════════════════════════════════════════
// DISTRIBUIDORA
// ════════════════════════════════════════════════════════════════════════════
app.get('/api/distribuidora', q(async (req, res) => {
  const r = await pool.query('SELECT * FROM Distribuidora ORDER BY id_distribuidora');
  res.json(r.rows);
}));

app.post('/api/distribuidora', q(async (req, res) => {
  const { nombre, rfc, dir_calle_ciudad, dir_cp, telefono, correo } = req.body;
  const r = await pool.query(
    `INSERT INTO Distribuidora (nombre, rfc, dir_calle_ciudad, dir_cp, telefono, correo)
     VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
    [nombre, rfc, dir_calle_ciudad, dir_cp, telefono, correo]
  );
  res.json(r.rows[0]);
}));

app.delete('/api/distribuidora/:id', q(async (req, res) => {
  await pool.query('DELETE FROM Distribuidora WHERE id_distribuidora=$1', [req.params.id]);
  res.json({ ok: true });
}));


// ════════════════════════════════════════════════════════════════════════════
// CLIENTE
// ════════════════════════════════════════════════════════════════════════════
app.get('/api/cliente', q(async (req, res) => {
  const r = await pool.query('SELECT * FROM Cliente ORDER BY id_cliente');
  res.json(r.rows);
}));

app.post('/api/cliente', q(async (req, res) => {
  const { nombre, dir_calle_ciudad, dir_cp, correo, tipo_cliente, tipo_atencion } = req.body;
  const r = await pool.query(
    `INSERT INTO Cliente (nombre, dir_calle_ciudad, dir_cp, correo, tipo_cliente, tipo_atencion)
     VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
    [nombre, dir_calle_ciudad, dir_cp, correo, tipo_cliente, tipo_atencion]
  );
  res.json(r.rows[0]);
}));

app.delete('/api/cliente/:id', q(async (req, res) => {
  await pool.query('DELETE FROM Cliente WHERE id_cliente=$1', [req.params.id]);
  res.json({ ok: true });
}));


// ════════════════════════════════════════════════════════════════════════════
// CLIENTE CON FACTURA
// ════════════════════════════════════════════════════════════════════════════
app.get('/api/clientefactura', q(async (req, res) => {
  const r = await pool.query('SELECT * FROM ClienteConFactura ORDER BY id_cliente');
  res.json(r.rows);
}));

app.post('/api/clientefactura', q(async (req, res) => {
  const { id_cliente, rfc } = req.body;
  const r = await pool.query(
    `INSERT INTO ClienteConFactura (id_cliente, rfc) VALUES ($1,$2) RETURNING *`,
    [id_cliente, rfc]
  );
  res.json(r.rows[0]);
}));

app.delete('/api/clientefactura/:id', q(async (req, res) => {
  await pool.query('DELETE FROM ClienteConFactura WHERE id_cliente=$1', [req.params.id]);
  res.json({ ok: true });
}));


// ════════════════════════════════════════════════════════════════════════════
// CLIENTE SIN FACTURA
// ════════════════════════════════════════════════════════════════════════════
app.get('/api/clientesinfactura', q(async (req, res) => {
  const r = await pool.query('SELECT * FROM ClienteSinFactura ORDER BY id_cliente');
  res.json(r.rows);
}));

app.post('/api/clientesinfactura', q(async (req, res) => {
  const { id_cliente } = req.body;
  const r = await pool.query(
    `INSERT INTO ClienteSinFactura (id_cliente) VALUES ($1) RETURNING *`,
    [id_cliente]
  );
  res.json(r.rows[0]);
}));

app.delete('/api/clientesinfactura/:id', q(async (req, res) => {
  await pool.query('DELETE FROM ClienteSinFactura WHERE id_cliente=$1', [req.params.id]);
  res.json({ ok: true });
}));


// ════════════════════════════════════════════════════════════════════════════
// PROVEEDOR
// ════════════════════════════════════════════════════════════════════════════
app.get('/api/proveedor', q(async (req, res) => {
  const r = await pool.query('SELECT * FROM Proveedor ORDER BY id_proveedor');
  res.json(r.rows);
}));

app.post('/api/proveedor', q(async (req, res) => {
  const { nombre, rfc, contacto } = req.body;
  const r = await pool.query(
    `INSERT INTO Proveedor (nombre, rfc, contacto) VALUES ($1,$2,$3) RETURNING *`,
    [nombre, rfc, contacto]
  );
  res.json(r.rows[0]);
}));

app.delete('/api/proveedor/:id', q(async (req, res) => {
  await pool.query('DELETE FROM Proveedor WHERE id_proveedor=$1', [req.params.id]);
  res.json({ ok: true });
}));


// ════════════════════════════════════════════════════════════════════════════
// PRODUCTO
// ════════════════════════════════════════════════════════════════════════════
app.get('/api/producto', q(async (req, res) => {
  const r = await pool.query('SELECT * FROM Producto ORDER BY id_producto');
  res.json(r.rows);
}));

app.post('/api/producto', q(async (req, res) => {
  const { nombre, codigo_barras, precio_venta, stock } = req.body;
  const r = await pool.query(
    `INSERT INTO Producto (nombre, codigo_barras, precio_venta, stock)
     VALUES ($1,$2,$3,$4) RETURNING *`,
    [nombre, codigo_barras, precio_venta, stock || 0]
  );
  res.json(r.rows[0]);
}));

app.delete('/api/producto/:id', q(async (req, res) => {
  await pool.query('DELETE FROM Producto WHERE id_producto=$1', [req.params.id]);
  res.json({ ok: true });
}));


// ════════════════════════════════════════════════════════════════════════════
// TRABAJADOR
// ════════════════════════════════════════════════════════════════════════════
app.get('/api/trabajador', q(async (req, res) => {
  const r = await pool.query('SELECT * FROM Trabajador ORDER BY id_trabajador');
  res.json(r.rows);
}));

app.post('/api/trabajador', q(async (req, res) => {
  const { nombre, curp, sueldo, id_distribuidora } = req.body;
  const r = await pool.query(
    `INSERT INTO Trabajador (nombre, curp, sueldo, id_distribuidora)
     VALUES ($1,$2,$3,$4) RETURNING *`,
    [nombre, curp, sueldo || 0, id_distribuidora]
  );
  res.json(r.rows[0]);
}));

app.delete('/api/trabajador/:id', q(async (req, res) => {
  await pool.query('DELETE FROM Trabajador WHERE id_trabajador=$1', [req.params.id]);
  res.json({ ok: true });
}));


// ════════════════════════════════════════════════════════════════════════════
// TRABAJADOR INTERNO
// ════════════════════════════════════════════════════════════════════════════
app.get('/api/trabajadorinterno', q(async (req, res) => {
  const r = await pool.query('SELECT * FROM TrabajadorInterno ORDER BY id_trabajador');
  res.json(r.rows);
}));

app.post('/api/trabajadorinterno', q(async (req, res) => {
  const { id_trabajador, turno } = req.body;
  const r = await pool.query(
    `INSERT INTO TrabajadorInterno (id_trabajador, turno) VALUES ($1,$2) RETURNING *`,
    [id_trabajador, turno]
  );
  res.json(r.rows[0]);
}));

app.delete('/api/trabajadorinterno/:id', q(async (req, res) => {
  await pool.query('DELETE FROM TrabajadorInterno WHERE id_trabajador=$1', [req.params.id]);
  res.json({ ok: true });
}));


// ════════════════════════════════════════════════════════════════════════════
// REPARTIDOR CONSEGUIDOR
// ════════════════════════════════════════════════════════════════════════════
app.get('/api/repartidor', q(async (req, res) => {
  const r = await pool.query('SELECT * FROM RepartidorConseguidor ORDER BY id_trabajador');
  res.json(r.rows);
}));

app.post('/api/repartidor', q(async (req, res) => {
  const { id_trabajador } = req.body;
  const r = await pool.query(
    `INSERT INTO RepartidorConseguidor (id_trabajador) VALUES ($1) RETURNING *`,
    [id_trabajador]
  );
  res.json(r.rows[0]);
}));

app.delete('/api/repartidor/:id', q(async (req, res) => {
  await pool.query('DELETE FROM RepartidorConseguidor WHERE id_trabajador=$1', [req.params.id]);
  res.json({ ok: true });
}));


// ════════════════════════════════════════════════════════════════════════════
// COMPRA
// ════════════════════════════════════════════════════════════════════════════
app.get('/api/compra', q(async (req, res) => {
  const r = await pool.query('SELECT * FROM Compra ORDER BY id_compra');
  res.json(r.rows);
}));

app.post('/api/compra', q(async (req, res) => {
  const { id_cliente, fecha, total } = req.body;
  const r = await pool.query(
    `INSERT INTO Compra (id_cliente, fecha, total)
     VALUES ($1,$2,$3) RETURNING *`,
    [id_cliente, fecha || new Date().toISOString().split('T')[0], total || 0]
  );
  res.json(r.rows[0]);
}));

app.delete('/api/compra/:id', q(async (req, res) => {
  await pool.query('DELETE FROM Compra WHERE id_compra=$1', [req.params.id]);
  res.json({ ok: true });
}));


// ════════════════════════════════════════════════════════════════════════════
// DETALLE COMPRA
// ════════════════════════════════════════════════════════════════════════════
app.get('/api/detalle', q(async (req, res) => {
  const r = await pool.query('SELECT * FROM DetalleCompra ORDER BY id_compra');
  res.json(r.rows);
}));

app.post('/api/detalle', q(async (req, res) => {
  const { id_compra, id_producto, cantidad, precio_unitario } = req.body;
  const r = await pool.query(
    `INSERT INTO DetalleCompra (id_compra, id_producto, cantidad, precio_unitario)
     VALUES ($1,$2,$3,$4) RETURNING *`,
    [id_compra, id_producto, cantidad || 1, precio_unitario]
  );
  res.json(r.rows[0]);
}));

app.delete('/api/detalle/:compra/:producto', q(async (req, res) => {
  await pool.query(
    'DELETE FROM DetalleCompra WHERE id_compra=$1 AND id_producto=$2',
    [req.params.compra, req.params.producto]
  );
  res.json({ ok: true });
}));


// ════════════════════════════════════════════════════════════════════════════
// SUMINISTRO
// ════════════════════════════════════════════════════════════════════════════
app.get('/api/suministro', q(async (req, res) => {
  const r = await pool.query('SELECT * FROM Suministro ORDER BY fecha_suministro DESC');
  res.json(r.rows);
}));

app.post('/api/suministro', q(async (req, res) => {
  const { id_distribuidora, id_proveedor, id_producto, fecha_suministro, cantidad_recibida, precio_adquisicion } = req.body;
  const r = await pool.query(
    `INSERT INTO Suministro (id_distribuidora, id_proveedor, id_producto, fecha_suministro, cantidad_recibida, precio_adquisicion)
     VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
    [id_distribuidora, id_proveedor, id_producto, fecha_suministro, cantidad_recibida, precio_adquisicion]
  );
  res.json(r.rows[0]);
}));

app.delete('/api/suministro/:dis/:prov/:prod/:fecha', q(async (req, res) => {
  await pool.query(
    'DELETE FROM Suministro WHERE id_distribuidora=$1 AND id_proveedor=$2 AND id_producto=$3 AND fecha_suministro=$4',
    [req.params.dis, req.params.prov, req.params.prod, req.params.fecha]
  );
  res.json({ ok: true });
}));


// ════════════════════════════════════════════════════════════════════════════
// TELEFONOS CLIENTE
// ════════════════════════════════════════════════════════════════════════════
app.get('/api/telcliente', q(async (req, res) => {
  const r = await pool.query('SELECT * FROM Telefonos_Cliente ORDER BY id');
  res.json(r.rows);
}));

app.post('/api/telcliente', q(async (req, res) => {
  const { id_cliente, telefono } = req.body;
  const r = await pool.query(
    `INSERT INTO Telefonos_Cliente (id_cliente, telefono) VALUES ($1,$2) RETURNING *`,
    [id_cliente, telefono]
  );
  res.json(r.rows[0]);
}));

app.delete('/api/telcliente/:id', q(async (req, res) => {
  await pool.query('DELETE FROM Telefonos_Cliente WHERE id=$1', [req.params.id]);
  res.json({ ok: true });
}));


// ════════════════════════════════════════════════════════════════════════════
// TELEFONOS TRABAJADOR
// ════════════════════════════════════════════════════════════════════════════
app.get('/api/teltrabajador', q(async (req, res) => {
  const r = await pool.query('SELECT * FROM Telefonos_Trabajador ORDER BY id');
  res.json(r.rows);
}));

app.post('/api/teltrabajador', q(async (req, res) => {
  const { id_trabajador, telefono } = req.body;
  const r = await pool.query(
    `INSERT INTO Telefonos_Trabajador (id_trabajador, telefono) VALUES ($1,$2) RETURNING *`,
    [id_trabajador, telefono]
  );
  res.json(r.rows[0]);
}));

app.delete('/api/teltrabajador/:id', q(async (req, res) => {
  await pool.query('DELETE FROM Telefonos_Trabajador WHERE id=$1', [req.params.id]);
  res.json({ ok: true });
}));


// ════════════════════════════════════════════════════════════════════════════
app.listen(3000, () => console.log('✅  Servidor corriendo en http://localhost:3000'));
