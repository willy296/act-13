const { createApp } = Vue;
const moneda = new Intl.NumberFormat('es-MX', {
 style: 'currency',
 currency: 'MXN'
});
createApp({
 data() {
 return {
 busqueda: '',
 categoria: '',
 soloDisponibles: false, // Reto B
 orden: '', // Reto C: '', 'asc' o 'desc'
 productos: [
 { id: 1, nombre: 'Teclado mecánico', categoria: 'Periféricos',
 precio: 890, stock: 8 },
 { id: 2, nombre: 'Ratón inalámbrico', categoria: 'Periféricos',
 precio: 350, stock: 0 },
 { id: 3, nombre: 'Audífonos USB', categoria: 'Audio',
 precio: 520, stock: 5 },
 { id: 4, nombre: 'Bocina portátil', categoria: 'Audio',
 precio: 680, stock: 0 },
 { id: 5, nombre: 'Memoria USB 64 GB', categoria: 'Almacenamiento',
 precio: 180, stock: 14 },
 { id: 6, nombre: 'SSD portátil 1 TB', categoria: 'Almacenamiento',
 precio: 1490, stock: 3 },
 // Reto A: tres productos nuevos (categoría nueva: Monitores)
 { id: 7, nombre: 'Monitor 24 pulgadas', categoria: 'Monitores',
 precio: 2790, stock: 4 },
 { id: 8, nombre: 'Webcam Full HD', categoria: 'Periféricos',
 precio: 760, stock: 0 },
 { id: 9, nombre: 'Monitor curvo 27 pulgadas', categoria: 'Monitores',
 precio: 4350, stock: 2 }
 ]
 };
 },
 computed: {
 // Desafío opcional: categorías únicas obtenidas de los datos
 categorias() {
 return [...new Set(this.productos.map((p) => p.categoria))];
 },
 productosFiltrados() {
 const consulta = this.busqueda.trim().toLowerCase();
 // filter devuelve un arreglo NUEVO; this.productos no se altera
 const resultado = this.productos.filter((producto) => {
 const coincideNombre =
 producto.nombre.toLowerCase().includes(consulta);
 const coincideCategoria =
 this.categoria === '' || producto.categoria === this.categoria;
 const coincideStock =
 !this.soloDisponibles || producto.stock > 0;
 return coincideNombre && coincideCategoria && coincideStock;
 });
 // Reto C: se ordena el arreglo nuevo, nunca this.productos
 if (this.orden === 'asc') {
 resultado.sort((a, b) => a.precio - b.precio);
 } else if (this.orden === 'desc') {
 resultado.sort((a, b) => b.precio - a.precio);
 }
 return resultado;
 }
 },
 methods: {
 limpiarFiltros() {
 this.busqueda = '';
 this.categoria = '';
 this.soloDisponibles = false;
 this.orden = '';
 },
 formatearPrecio(precio) {
 return moneda.format(precio);
 }
 }
}).mount('#app');
