// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { FiEdit, FiTrash2 } from 'react-icons/fi';

// const CelebrationCards = () => {
//   const [cards, setCards] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     category: '',
//     image: null,
//   });
//   const [editingCard, setEditingCard] = useState(null);
//   const [categoryFilter, setCategoryFilter] = useState('');

//   const BASE_URL = 'http://localhost:5000/api/occasion-cards';
//   const IMAGE_BASE_URL = 'http://localhost:5000/uploads/';

//   useEffect(() => {
//     fetchCards();
//   }, []);

//   const fetchCards = async () => {
//     try {
//       const res = await axios.get(`${BASE_URL}/getAll`);
//       const sorted = res.data.slice().reverse();
//       setCards(sorted);
//     } catch (err) {
//       toast.error('Failed to fetch cards');
//     }
//   };

//   const handleChange = (e) => {
//     if (e.target.name === 'image') {
//       setFormData({ ...formData, image: e.target.files[0] });
//     } else {
//       setFormData({ ...formData, [e.target.name]: e.target.value });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Only validate required fields during ADD
//     if (!editingCard) {
//       if (!formData.title.trim()) return toast.error('Title is required');
//       if (!formData.description.trim()) return toast.error('Description is required');
//       if (!formData.category.trim()) return toast.error('Category is required');
//       if (!formData.image) return toast.error('Image is required');
//     }

//     const data = new FormData();
//     data.append('title', formData.title);
//     data.append('description', formData.description);
//     data.append('category', formData.category);
//     if (formData.image) data.append('image', formData.image);

//     try {
//       if (editingCard) {
//         await axios.put(`${BASE_URL}/update/${editingCard.id}`, data);
//         toast.success('Card updated');
//       } else {
//         await axios.post(`${BASE_URL}/create`, data);
//         toast.success('Card created');
//       }

//       fetchCards();
//       setShowForm(false);
//       setEditingCard(null);
//       setFormData({ title: '', description: '', category: '', image: null });
//     } catch (err) {
//       console.error(err);
//       toast.error('Failed to save card');
//     }
//   };

//   const handleEdit = (card) => {
//     setFormData({
//       title: card.title,
//       description: card.description,
//       category: card.category,
//       image: null,
//     });
//     setEditingCard(card);
//     setShowForm(true);
//   };

//   const handleDelete = async (id) => {
//     try {
//       const response = await axios.delete(`${BASE_URL}/delete/${id}`);
//       if (response.status === 200) {
//         toast.success('Card deleted');
//         fetchCards();
//       } else {
//         toast.error('Failed to delete card');
//       }
//     } catch (err) {
//       console.error("Delete error:", err.response?.data || err.message);
//       toast.error(err.response?.data?.error || 'Failed to delete card');
//     }
//   };

//   const handleCategoryFilter = async () => {
//     try {
//       const res = await axios.get(`${BASE_URL}/getByCategory/${categoryFilter}`);
//       setCards(res.data);
//     } catch (err) {
//       toast.error('Failed to filter cards');
//     }
//   };

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold text-[#2a2e3b]">🎊 Celebration Cards Management</h2>
//         <div className="flex space-x-4">
//           <input
//             type="text"
//             placeholder="Filter by category"
//             value={categoryFilter}
//             onChange={(e) => setCategoryFilter(e.target.value)}
//             className="border p-2 rounded"
//           />
//           <button
//             onClick={handleCategoryFilter}
//             className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
//           >
//             Filter
//           </button>
//           <button
//             onClick={() => {
//               setShowForm(true);
//               setEditingCard(null);
//               setFormData({ title: '', description: '', category: '', image: null });
//             }}
//             className="bg-[#e76f51] hover:bg-[#d45f3f] text-white px-4 py-2 rounded"
//           >
//             Add New Card
//           </button>
//         </div>
//       </div>

//       {showForm && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//           <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
//             <h3 className="text-xl font-semibold mb-4">
//               {editingCard ? 'Update Card' : 'Create Card'}
//             </h3>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <input
//                 type="text"
//                 name="title"
//                 value={formData.title}
//                 onChange={handleChange}
//                 placeholder="Title"
//                 className="w-full p-2 border rounded"
//               />
//               <input
//                 type="text"
//                 name="category"
//                 value={formData.category}
//                 onChange={handleChange}
//                 placeholder="Category"
//                 className="w-full p-2 border rounded"
//               />
//               <textarea
//                 name="description"
//                 value={formData.description}
//                 onChange={handleChange}
//                 placeholder="Description"
//                 className="w-full p-2 border rounded"
//               />
//               <input
//                 type="file"
//                 name="image"
//                 onChange={handleChange}
//                 className="w-full p-2 border rounded"
//               />
//               <div className="flex justify-between mt-4">
//                 <button
//                   type="submit"
//                   className="bg-[#e76f51] hover:bg-[#d45f3f] text-white px-4 py-2 rounded"
//                 >
//                   {editingCard ? 'Update' : 'Create'}
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setShowForm(false);
//                     setEditingCard(null);
//                     setFormData({ title: '', description: '', category: '', image: null });
//                   }}
//                   className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       <div className="overflow-x-auto mt-6">
//         <table className="min-w-full bg-white border border-gray-200 shadow-md rounded">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="p-3 border">S. No.</th>
//               <th className="p-3 border">Image</th>
//               <th className="p-3 border">Title</th>
//               <th className="p-3 border">Description</th>
//               <th className="p-3 border">Category</th>
//               <th className="p-3 border">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {cards.length > 0 ? (
//               cards.map((card, index) => (
//                 <tr key={card.id} className="border-t hover:bg-gray-50">
//                   <td className="p-3 border text-center">{index + 1}</td>
//                   <td className="p-3 border text-center">
//                     <img
//                       src={
//                         card.image_url
//                           ? `${IMAGE_BASE_URL}${card.image_url}`
//                           : 'https://via.placeholder.com/100'
//                       }
//                       alt={card.title}
//                       className="w-16 h-16 object-cover rounded mx-auto"
//                     />
//                   </td>
//                   <td className="p-3 border">{card.title}</td>
//                   <td className="p-3 border">{card.description}</td>
//                   <td className="p-3 border">{card.category}</td>
//                   <td className="p-3 border text-center">
//                     <div className="flex justify-center gap-2">
//                       <FiEdit
//                         className="text-yellow-500 hover:text-yellow-600 cursor-pointer"
//                         size={20}
//                         onClick={() => handleEdit(card)}
//                       />
//                       <FiTrash2
//                         className="text-red-500 hover:text-red-600 cursor-pointer"
//                         size={20}
//                         onClick={() => handleDelete(card.id)}
//                       />
//                     </div>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="6" className="text-center p-4 text-gray-500">
//                   No cards found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default CelebrationCards;


//--------------------------------------------------------------------------------------------------


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { FiEdit, FiTrash2 } from 'react-icons/fi';

// const CelebrationCards = () => {
//   const [cards, setCards] = useState([]);
//   const [allCards, setAllCards] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     categories: [],
//     image: null,
//   });
//   const [editingCard, setEditingCard] = useState(null);
//   const [categoryFilter, setCategoryFilter] = useState('');

//   const BASE_URL = 'http://localhost:5000/api/occasion-cards';
//   const IMAGE_BASE_URL = 'http://localhost:5000/uploads/';

//   const availableCategories = [
//     'Corporate Events',
//     'Weddings & Engagements',
//     'Birthday Celebrations',
//     'Festivals',
//     'Housewarming Parties',
//     'Baby Showers',
//     'Weekend & Private Parties',
//   ];

//   useEffect(() => {
//     fetchCards();
//   }, []);

//   const fetchCards = async () => {
//     try {
//       const res = await axios.get(`${BASE_URL}/getAll`);
//       const sorted = res.data.slice().reverse(); // No need to process categories
//       setCards(sorted);
//       setAllCards(sorted);
//     } catch (err) {
//       console.error('Fetch cards error:', err);
//       toast.error(err.response?.data?.error || 'Failed to fetch cards.');
//     }
//   };
  

//   const handleChange = (e) => {
//     const { name, value, type, checked, files } = e.target;

//     if (name === 'image') {
//       setFormData({ ...formData, image: files[0] });
//     } else if (name === 'categories') {
//       const updated = checked
//         ? [...formData.categories, value]
//         : formData.categories.filter(c => c !== value);
//       setFormData({ ...formData, categories: updated });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.title || !formData.description || formData.categories.length === 0) {
//       return toast.error('All fields except image (in update) are required.');
//     }

//     const data = new FormData();
//     data.append('title', formData.title);
//     data.append('description', formData.description);
//     data.append('categories', formData.categories.join(','));
//     if (formData.image) data.append('image', formData.image);

//     try {
//       if (editingCard) {
//         await axios.put(`${BASE_URL}/update/${editingCard.id}`, data);
//         toast.success('Card updated!');
//       } else {
//         if (!formData.image) return toast.error('Image is required');
//         await axios.post(`${BASE_URL}/create`, data);
//         toast.success('Card created!');
//       }

//       fetchCards();
//       resetForm();
//     } catch (err) {
//       console.error('Submit error:', err);
//       toast.error(err.response?.data?.error || 'Failed to save card.');
//     }
//   };

//   const resetForm = () => {
//     setShowForm(false);
//     setEditingCard(null);
//     setFormData({ title: '', description: '', categories: [], image: null });
//   };

//   const handleEdit = (card) => {
//     setFormData({
//       title: card.title,
//       description: card.description,
//       categories: card.categories,
//       image: null,
//     });
//     setEditingCard(card);
//     setShowForm(true);
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`${BASE_URL}/delete/${id}`);
//       toast.success('Card deleted!');
//       fetchCards();
//     } catch (err) {
//       console.error('Delete error:', err);
//       toast.error(err.response?.data?.error || 'Failed to delete card.');
//     }
//   };

//   const handleCategoryFilter = () => {
//     if (!categoryFilter) {
//       setCards(allCards);
//       return;
//     }

//     const filtered = allCards.filter(card =>
//       card.categories.includes(categoryFilter)
//     );
//     setCards(filtered);
//   };

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold text-[#2a2e3b]">🎊 Celebration Cards Management</h2>
//         <div className="flex space-x-4">
//           <select
//             value={categoryFilter}
//             onChange={(e) => setCategoryFilter(e.target.value)}
//             className="border p-2 rounded"
//           >
//             <option value="">All Categories</option>
//             {availableCategories.map((cat, i) => (
//               <option key={i} value={cat}>{cat}</option>
//             ))}
//           </select>
//           <button
//             onClick={handleCategoryFilter}
//             className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
//           >
//             Filter
//           </button>
//           <button
//             onClick={() => {
//               resetForm();
//               setShowForm(true);
//             }}
//             className="bg-[#e76f51] hover:bg-[#d45f3f] text-white px-4 py-2 rounded"
//           >
//             Add New Card
//           </button>
//         </div>
//       </div>

//       {showForm && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//           <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg">
//             <h3 className="text-lg font-bold text-center">{editingCard ? 'Update Card' : 'Create Card'}</h3>
//             <form onSubmit={handleSubmit} className="space-y-3 mt-4">
//               <input
//                 type="text"
//                 name="title"
//                 placeholder="Title"
//                 value={formData.title}
//                 onChange={handleChange}
//                 className="w-full p-2 border rounded"
//               />
//               <textarea
//                 name="description"
//                 placeholder="Description"
//                 value={formData.description}
//                 onChange={handleChange}
//                 rows="3"
//                 className="w-full p-2 border rounded"
//               />
//               <div>
//                 <h4 className="font-medium mb-1">Categories</h4>
//                 <div className="flex flex-wrap gap-2">
//                   {availableCategories.map((cat, i) => (
//                     <label key={i} className="flex items-center space-x-1">
//                       <input
//                         type="checkbox"
//                         name="categories"
//                         value={cat}
//                         checked={formData.categories.includes(cat)}
//                         onChange={handleChange}
//                       />
//                       <span>{cat}</span>
//                     </label>
//                   ))}
//                 </div>
//               </div>

//               {editingCard?.image_url && (
//                 <div>
//                   <p className="text-sm text-gray-600">Current Image:</p>
//                   <img
//                     src={`${IMAGE_BASE_URL}${editingCard.image_url}`}
//                     alt="Card"
//                     className="w-24 h-24 object-cover rounded"
//                   />
//                 </div>
//               )}

//               <input
//                 type="file"
//                 name="image"
//                 accept="image/*"
//                 onChange={handleChange}
//                 className="w-full p-2 border rounded"
//               />

//               <div className="flex justify-between mt-4">
//                 <button type="submit" className="bg-[#e76f51] text-white px-4 py-2 rounded">
//                   {editingCard ? 'Update' : 'Create'}
//                 </button>
//                 <button type="button" onClick={resetForm} className="bg-gray-300 px-4 py-2 rounded">
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       <div className="overflow-x-auto mt-6">
//         <table className="min-w-full bg-white shadow rounded border">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="p-3 border">Sr No</th>
//               <th className="p-3 border">Image</th>
//               <th className="p-3 border">Title</th>
//               <th className="p-3 border">Description</th>
//               <th className="p-3 border">Categories</th>
//               <th className="p-3 border">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {cards.length > 0 ? (
//               cards.map((card, index) => (
//                 <tr key={card.id} className="border-t">
//                   <td className="p-3 text-center">{index + 1}</td>
//                   <td className="p-3 text-center">
//                     <img
//                       src={card.image_url ? `${IMAGE_BASE_URL}${card.image_url}` : 'https://via.placeholder.com/100'}
//                       alt={card.title}
//                       className="w-16 h-16 object-cover rounded"
//                     />
//                   </td>
//                   <td className="p-3">{card.title}</td>
//                   <td className="p-3">{card.description}</td>
//                   <td className="p-3">
//                     <ul className="list-disc ml-4 text-sm text-gray-700">
//                       {card.categories.map((cat, idx) => (
//                         <li key={idx}>{cat}</li>
//                       ))}
//                     </ul>
//                   </td>
//                   <td className="p-3 text-center space-x-2">
//                     <button onClick={() => handleEdit(card)} className="text-blue-600 hover:text-blue-800">
//                       <FiEdit />
//                     </button>
//                     <button onClick={() => handleDelete(card.id)} className="text-red-600 hover:text-red-800">
//                       <FiTrash2 />
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="6" className="text-center py-4 text-gray-500">
//                   No cards found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default CelebrationCards;





// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { FiEdit, FiTrash2 } from 'react-icons/fi';

// const CelebrationCards = () => {
//   const [cards, setCards] = useState([]);
//   const [allCards, setAllCards] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [showCardForm, setShowCardForm] = useState(false);
//   const [showCategoryForm, setShowCategoryForm] = useState(false);
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     categories: [],
//     image: null,
//   });
//   const [categoryFormData, setCategoryFormData] = useState({
//     name: '',
//   });
//   const [editingCard, setEditingCard] = useState(null);
//   const [editingCategory, setEditingCategory] = useState(null);
//   const [categoryFilter, setCategoryFilter] = useState('');

//   const CARD_BASE_URL = 'http://localhost:5000/api/occasion-cards';
//   const CATEGORY_BASE_URL = 'http://localhost:5000/api/categories';
//   const IMAGE_BASE_URL = 'http://localhost:5000/uploads/';

//   useEffect(() => {
//     fetchCards();
//     fetchCategories();
//   }, []);

//   const fetchCards = async () => {
//     try {
//       const res = await axios.get(`${CARD_BASE_URL}/getAll`);
//       const sorted = res.data.slice().reverse();
//       setCards(sorted);
//       setAllCards(sorted);
//     } catch (err) {
//       console.error('Fetch cards error:', err);
//       toast.error(err.response?.data?.error || 'Failed to fetch cards.');
//     }
//   };

//   const fetchCategories = async () => {
//     try {
//       const res = await axios.get(`${CATEGORY_BASE_URL}/getAll`);
//       setCategories(res.data);
//     } catch (err) {
//       console.error('Fetch categories error:', err);
//       toast.error(err.response?.data?.error || 'Failed to fetch categories.');
//     }
//   };

//   const handleCardChange = (e) => {
//     const { name, value, type, checked, files } = e.target;

//     if (name === 'image') {
//       setFormData({ ...formData, image: files[0] });
//     } else if (name === 'categories') {
//       const updated = checked
//         ? [...formData.categories, value]
//         : formData.categories.filter(c => c !== value);
//       setFormData({ ...formData, categories: updated });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleCardSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.title || !formData.description || formData.categories.length === 0) {
//       return toast.error('All fields except image (in update) are required.');
//     }

//     const data = new FormData();
//     data.append('title', formData.title);
//     data.append('description', formData.description);
//     data.append('categories', formData.categories.join(','));
//     if (formData.image) data.append('image', formData.image);

//     try {
//       if (editingCard) {
//         await axios.put(`${CARD_BASE_URL}/update/${editingCard.id}`, data);
//         toast.success('Card updated!');
//       } else {
//         if (!formData.image) return toast.error('Image is required');
//         await axios.post(`${CARD_BASE_URL}/create`, data);
//         toast.success('Card created!');
//       }

//       fetchCards();
//       resetCardForm();
//     } catch (err) {
//       console.error('Card submit error:', err);
//       toast.error(err.response?.data?.error || 'Failed to save card.');
//     }
//   };

//   const resetCardForm = () => {
//     setShowCardForm(false);
//     setEditingCard(null);
//     setFormData({ title: '', description: '', categories: [], image: null });
//   };

//   const handleEditCard = (card) => {
//     setFormData({
//       title: card.title,
//       description: card.description,
//       categories: card.categories,
//       image: null,
//     });
//     setEditingCard(card);
//     setShowCardForm(true);
//   };

//   const handleDeleteCard = async (id) => {
//     try {
//       await axios.delete(`${CARD_BASE_URL}/delete/${id}`);
//       toast.success('Card deleted!');
//       fetchCards();
//     } catch (err) {
//       console.error('Card delete error:', err);
//       toast.error(err.response?.data?.error || 'Failed to delete card.');
//     }
//   };

//   const handleCategoryChange = (e) => {
//     const { name, value } = e.target;
//     setCategoryFormData({ ...categoryFormData, [name]: value });
//   };

//   const handleCategorySubmit = async (e) => {
//     e.preventDefault();
//     if (!categoryFormData.name.trim()) return toast.error('Category name required.');

//     try {
//       if (editingCategory) {
//         await axios.put(`${CATEGORY_BASE_URL}/update/${editingCategory.id}`, { name: categoryFormData.name });
//         toast.success('Category updated!');
//       } else {
//         await axios.post(`${CATEGORY_BASE_URL}/create`, { name: categoryFormData.name });
//         toast.success('Category created!');
//       }

//       fetchCategories();
//       resetCategoryForm();
//     } catch (err) {
//       console.error('Category submit error:', err);
//       toast.error(err.response?.data?.error || 'Failed to save category.');
//     }
//   };

//   const resetCategoryForm = () => {
//     setShowCategoryForm(false);
//     setEditingCategory(null);
//     setCategoryFormData({ name: '' });
//   };

//   const handleEditCategory = (cat) => {
//     setCategoryFormData({ name: cat.name });
//     setEditingCategory(cat);
//     setShowCategoryForm(true);
//   };

//   const handleDeleteCategory = async (id) => {
//     try {
//       await axios.delete(`${CATEGORY_BASE_URL}/delete/${id}`);
//       toast.success('Category deleted!');
//       fetchCategories();
//     } catch (err) {
//       console.error('Category delete error:', err);
//       toast.error(err.response?.data?.error || 'Failed to delete category.');
//     }
//   };

//   const handleCategoryFilter = () => {
//     if (!categoryFilter) {
//       setCards(allCards);
//       return;
//     }

//     const filtered = allCards.filter(card =>
//       card.categories.includes(categoryFilter)
//     );
//     setCards(filtered);
//   };

//   return (
//     <div className="p-6">
//       {/* Celebration Cards Section */}
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold text-[#2a2e3b]">🎉 Celebration Cards Management</h2>
//         <div className="flex space-x-4">
//           <select
//             value={categoryFilter}
//             onChange={(e) => setCategoryFilter(e.target.value)}
//             className="border p-2 rounded"
//           >
//             <option value="">All Categories</option>
//             {categories.map((cat) => (
//               <option key={cat.id} value={cat.name}>{cat.name}</option>
//             ))}
//           </select>
//           <button onClick={handleCategoryFilter} className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600">
//             Filter
//           </button>
//           <button onClick={() => { resetCardForm(); setShowCardForm(true); }} className="bg-[#e76f51] hover:bg-[#d45f3f] text-white px-4 py-2 rounded">
//             Add New Card
//           </button>
//         </div>
//       </div>

//       {/* Add/Update Card Form */}
//       {showCardForm && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//           <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg">
//             <h3 className="text-lg font-bold text-center">{editingCard ? 'Update Card' : 'Create Card'}</h3>
//             <form onSubmit={handleCardSubmit} className="space-y-3 mt-4">
//               <input
//                 type="text"
//                 name="title"
//                 placeholder="Title"
//                 value={formData.title}
//                 onChange={handleCardChange}
//                 className="w-full p-2 border rounded"
//               />
//               <textarea
//                 name="description"
//                 placeholder="Description"
//                 value={formData.description}
//                 onChange={handleCardChange}
//                 rows="3"
//                 className="w-full p-2 border rounded"
//               />
//               <div>
//                 <h4 className="font-medium mb-1">Categories</h4>
//                 <div className="flex flex-wrap gap-2">
//                   {categories.map((cat) => (
//                     <label key={cat.id} className="flex items-center space-x-1">
//                       <input
//                         type="checkbox"
//                         name="categories"
//                         value={cat.name}
//                         checked={formData.categories.includes(cat.name)}
//                         onChange={handleCardChange}
//                       />
//                       <span>{cat.name}</span>
//                     </label>
//                   ))}
//                 </div>
//               </div>
//               {editingCard?.image_url && (
//                 <div>
//                   <p className="text-sm text-gray-600">Current Image:</p>
//                   <img src={`${IMAGE_BASE_URL}${editingCard.image_url}`} alt="Card" className="w-24 h-24 object-cover rounded" />
//                 </div>
//               )}
//               <input
//                 type="file"
//                 name="image"
//                 accept="image/*"
//                 onChange={handleCardChange}
//                 className="w-full p-2 border rounded"
//               />

//               <div className="flex justify-between mt-4">
//                 <button type="submit" className="bg-[#e76f51] text-white px-4 py-2 rounded">
//                   {editingCard ? 'Update' : 'Create'}
//                 </button>
//                 <button type="button" onClick={resetCardForm} className="bg-gray-300 px-4 py-2 rounded">
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Cards Table */}
//       <div className="overflow-x-auto mt-6 mb-12">
//         <table className="min-w-full bg-white shadow rounded border">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="p-3 border">Sr No</th>
//               <th className="p-3 border">Image</th>
//               <th className="p-3 border">Title</th>
//               <th className="p-3 border">Description</th>
//               <th className="p-3 border">Categories</th>
//               <th className="p-3 border">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {cards.length > 0 ? (
//               cards.map((card, index) => (
//                 <tr key={card.id} className="border-t">
//                   <td className="p-3 text-center">{index + 1}</td>
//                   <td className="p-3 text-center">
//                     <img src={card.image_url ? `${IMAGE_BASE_URL}${card.image_url}` : 'https://via.placeholder.com/100'} alt={card.title} className="w-16 h-16 object-cover rounded" />
//                   </td>
//                   <td className="p-3">{card.title}</td>
//                   <td className="p-3">{card.description}</td>
//                   <td className="p-3">
//                     <ul className="list-disc ml-4 text-sm text-gray-700">
//                       {card.categories.map((cat, idx) => (
//                         <li key={idx}>{cat}</li>
//                       ))}
//                     </ul>
//                   </td>
//                   <td className="p-3 text-center space-x-2">
//                     <button onClick={() => handleEditCard(card)} className="text-blue-600 hover:text-blue-800"><FiEdit /></button>
//                     <button onClick={() => handleDeleteCard(card.id)} className="text-red-600 hover:text-red-800"><FiTrash2 /></button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="6" className="text-center py-4 text-gray-500">No cards found.</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Category Management Section */}
//       <div className="mb-10">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-2xl font-bold text-[#2a2e3b]">📚 Category Management</h2>
//           <button onClick={() => { resetCategoryForm(); setShowCategoryForm(true); }} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
//             Add New Category
//           </button>
//         </div>

//         {/* Add/Update Category Form */}
//         {showCategoryForm && (
//           <form onSubmit={handleCategorySubmit} className="bg-white p-4 rounded shadow mb-6 flex gap-4">
//             <input
//               type="text"
//               name="name"
//               placeholder="Category Name"
//               value={categoryFormData.name}
//               onChange={handleCategoryChange}
//               className="flex-1 p-2 border rounded"
//             />
//             <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
//               {editingCategory ? 'Update' : 'Create'}
//             </button>
//             <button type="button" onClick={resetCategoryForm} className="bg-gray-300 px-4 py-2 rounded">
//               Cancel
//             </button>
//           </form>
//         )}

//         {/* Categories List */}
//         <div className="grid gap-4">
//           {categories.length > 0 ? (
//             categories.map((cat, idx) => (
//               <div key={cat.id} className="flex justify-between items-center bg-white p-4 rounded shadow">
//                 <span className="text-lg">{cat.name}</span>
//                 <div className="space-x-2">
//                   <button onClick={() => handleEditCategory(cat)} className="text-blue-600 hover:text-blue-800"><FiEdit /></button>
//                   <button onClick={() => handleDeleteCategory(cat.id)} className="text-red-600 hover:text-red-800"><FiTrash2 /></button>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className="text-center text-gray-500">No categories found.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CelebrationCards;











import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

const CelebrationCards = () => {
  const [cards, setCards] = useState([]);
  const [allCards, setAllCards] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showCardForm, setShowCardForm] = useState(false);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    categories: [],
    image: null,
  });
  const [categoryFormData, setCategoryFormData] = useState({
    name: '',
  });
  const [editingCard, setEditingCard] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState('');

  const CARD_BASE_URL = 'http://localhost:5000/api/occasion-cards';
  const CATEGORY_BASE_URL = 'http://localhost:5000/api/categories';
  const IMAGE_BASE_URL = 'http://localhost:5000/uploads/';

  useEffect(() => {
    fetchCards();
    fetchCategories();
  }, []);

  const fetchCards = async () => {
    try {
      const res = await axios.get(`${CARD_BASE_URL}/getAll`);
      const sorted = res.data.slice().reverse();
      setCards(sorted);
      setAllCards(sorted);
    } catch (err) {
      console.error('Fetch cards error:', err);
      toast.error(err.response?.data?.error || 'Failed to fetch cards.');
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${CATEGORY_BASE_URL}/getAll`);
      setCategories(res.data);
    } catch (err) {
      console.error('Fetch categories error:', err);
      toast.error(err.response?.data?.error || 'Failed to fetch categories.');
    }
  };

  const handleCardChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else if (name === 'categories') {
      const updated = checked
        ? [...formData.categories, value]
        : formData.categories.filter(c => c !== value);
      setFormData({ ...formData, categories: updated });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleCardSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description || formData.categories.length === 0) {
      return toast.error('All fields except image (in update) are required.');
    }

    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('categories', formData.categories.join(','));
    if (formData.image) data.append('image', formData.image);

    try {
      if (editingCard) {
        await axios.put(`${CARD_BASE_URL}/update/${editingCard.id}`, data);
        toast.success('Card updated!');
      } else {
        if (!formData.image) return toast.error('Image is required');
        await axios.post(`${CARD_BASE_URL}/create`, data);
        toast.success('Card created!');
      }

      fetchCards();
      resetCardForm();
    } catch (err) {
      console.error('Card submit error:', err);
      toast.error(err.response?.data?.error || 'Failed to save card.');
    }
  };

  const resetCardForm = () => {
    setShowCardForm(false);
    setEditingCard(null);
    setFormData({ title: '', description: '', categories: [], image: null });
  };

  const handleEditCard = (card) => {
    setFormData({
      title: card.title,
      description: card.description,
      categories: card.categories,
      image: null,
    });
    setEditingCard(card);
    setShowCardForm(true);
  };

  const handleDeleteCard = async (id) => {
    try {
      await axios.delete(`${CARD_BASE_URL}/delete/${id}`);
      toast.success('Card deleted!');
      fetchCards();
    } catch (err) {
      console.error('Card delete error:', err);
      toast.error(err.response?.data?.error || 'Failed to delete card.');
    }
  };

  const handleCategoryChange = (e) => {
    const { name, value } = e.target;
    setCategoryFormData({ ...categoryFormData, [name]: value });
  };

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    if (!categoryFormData.name.trim()) return toast.error('Category name required.');

    try {
      if (editingCategory) {
        await axios.put(`${CATEGORY_BASE_URL}/update/${editingCategory.id}`, { name: categoryFormData.name });
        toast.success('Category updated!');
      } else {
        await axios.post(`${CATEGORY_BASE_URL}/create`, { name: categoryFormData.name });
        toast.success('Category created!');
      }

      fetchCategories();
      resetCategoryForm();
    } catch (err) {
      console.error('Category submit error:', err);
      toast.error(err.response?.data?.error || 'Failed to save category.');
    }
  };

  const resetCategoryForm = () => {
    setShowCategoryForm(false);
    setEditingCategory(null);
    setCategoryFormData({ name: '' });
  };

  const handleEditCategory = (cat) => {
    setCategoryFormData({ name: cat.name });
    setEditingCategory(cat);
    setShowCategoryForm(true);
  };

  const handleDeleteCategory = async (id) => {
    try {
      await axios.delete(`${CATEGORY_BASE_URL}/delete/${id}`);
      toast.success('Category deleted!');
      fetchCategories();
    } catch (err) {
      console.error('Category delete error:', err);
      toast.error(err.response?.data?.error || 'Failed to delete category.');
    }
  };

  const handleCategoryFilter = () => {
    if (!categoryFilter) {
      setCards(allCards);
      return;
    }

    const filtered = allCards.filter(card =>
      card.categories.includes(categoryFilter)
    );
    setCards(filtered);
  };

  return (
    <div className="p-6">
      {/* Celebration Cards Section */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#2a2e3b]">🎉 Celebration Cards Management</h2>
        <div className="flex space-x-4">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>{cat.name}</option>
            ))}
          </select>
          <button onClick={handleCategoryFilter} className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600">
            Filter
          </button>
          <button onClick={() => { resetCardForm(); setShowCardForm(true); }} className="bg-[#e76f51] hover:bg-[#d45f3f] text-white px-4 py-2 rounded">
            Add New Card
          </button>
        </div>
      </div>

      {/* Add/Update Card Form */}
      {showCardForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg">
            <h3 className="text-lg font-bold text-center">{editingCard ? 'Update Card' : 'Create Card'}</h3>
            <form onSubmit={handleCardSubmit} className="space-y-3 mt-4">
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleCardChange}
                className="w-full p-2 border rounded"
              />
              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleCardChange}
                rows="3"
                className="w-full p-2 border rounded"
              />
              <div>
                <h4 className="font-medium mb-1">Categories</h4>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <label key={cat.id} className="flex items-center space-x-1">
                      <input
                        type="checkbox"
                        name="categories"
                        value={cat.name}
                        checked={formData.categories.includes(cat.name)}
                        onChange={handleCardChange}
                      />
                      <span>{cat.name}</span>
                    </label>
                  ))}
                </div>
              </div>
              {editingCard?.image_url && (
                <div>
                  <p className="text-sm text-gray-600">Current Image:</p>
                  <img src={`${IMAGE_BASE_URL}${editingCard.image_url}`} alt="Card" className="w-24 h-24 object-cover rounded" />
                </div>
              )}
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleCardChange}
                className="w-full p-2 border rounded"
              />

              <div className="flex justify-between mt-4">
                <button type="submit" className="bg-[#e76f51] text-white px-4 py-2 rounded">
                  {editingCard ? 'Update' : 'Create'}
                </button>
                <button type="button" onClick={resetCardForm} className="bg-gray-300 px-4 py-2 rounded">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Cards Table */}
      <div className="overflow-x-auto mt-6 mb-12">
        <table className="min-w-full bg-white shadow rounded border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border">Sr No</th>
              <th className="p-3 border">Image</th>
              <th className="p-3 border">Title</th>
              <th className="p-3 border">Description</th>
              <th className="p-3 border">Categories</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cards.length > 0 ? (
              cards.map((card, index) => (
                <tr key={card.id} className="border-t">
                  <td className="p-3 text-center">{index + 1}</td>
                  <td className="p-3 text-center">
                    <img src={card.image_url ? `${IMAGE_BASE_URL}${card.image_url}` : 'https://via.placeholder.com/100'} alt={card.title} className="w-16 h-16 object-cover rounded" />
                  </td>
                  <td className="p-3">{card.title}</td>
                  <td className="p-3">{card.description}</td>
                  <td className="p-3">
                    <ul className="list-disc ml-4 text-sm text-gray-700">
                      {card.categories.map((cat, idx) => (
                        <li key={idx}>{cat}</li>
                      ))}
                    </ul>
                  </td>
                  <td className="p-3 text-center space-x-2">
                    <button onClick={() => handleEditCard(card)} className="text-blue-600 hover:text-blue-800"><FiEdit /></button>
                    <button onClick={() => handleDeleteCard(card.id)} className="text-red-600 hover:text-red-800"><FiTrash2 /></button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">No cards found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Category Management Section */}
      <div className="mb-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#2a2e3b]">📚 Category Management</h2>
          <button 
            onClick={() => { resetCategoryForm(); setShowCategoryForm(true); }} 
            className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 flex items-center gap-2"
          >
            <span className="text-lg">+ Add Category</span>
          </button>
        </div>

        {/* Add/Update Category Form */}
        {showCategoryForm && (
          <form onSubmit={handleCategorySubmit} className="bg-white p-4 rounded-lg shadow-md mb-6 flex gap-4 items-center">
            <input
              type="text"
              name="name"
              placeholder="Category Name"
              value={categoryFormData.name}
              onChange={handleCategoryChange}
              className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button 
              type="submit" 
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              {editingCategory ? 'Update' : 'Create'}
            </button>
            <button 
              type="button" 
              onClick={resetCategoryForm} 
              className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition duration-300"
            >
              Cancel
            </button>
          </form>
        )}

        {/* Categories Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-blue-50">
              <tr>
                <th className="p-4 text-left text-sm font-semibold text-gray-600">Category Name</th>
                <th className="p-4 text-right text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat.id} className="border-t">
                  <td className="p-4">{cat.name}</td>
                  <td className="p-4 text-right space-x-2">
                    <button onClick={() => handleEditCategory(cat)} className="text-blue-600 hover:text-blue-800"><FiEdit /></button>
                    <button onClick={() => handleDeleteCategory(cat.id)} className="text-red-600 hover:text-red-800"><FiTrash2 /></button>
                  </td>
                </tr>
              ))}
              {categories.length === 0 && (
                <tr>
                  <td colSpan="2" className="text-center py-4 text-gray-500">No categories found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CelebrationCards;
