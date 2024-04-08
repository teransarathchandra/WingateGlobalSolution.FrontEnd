import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { IColumn, IRow } from "../../../../../interfaces/ITable";
import ReusableTable from "../../../../shared/ReusableTable";
import { getAllCategory, updateCategory, deleteCategory } from "../../../../../services/categoryService";
import { ICategory } from "../../../../../interfaces/ICategory";
import EditDialog from "../../../../dialog/EditDialog";

const columns: IColumn[] = [
  { id: "categoryId", label: "Category ID", numeric: false, disablePadding: true },
  { id: "name", label: "Name", numeric: false, disablePadding: false },
  { id: "description", label: "Description", numeric: false, disablePadding: false },
  { id: "costPerKilo", label: "Cost Per Kilo", numeric: true, disablePadding: false },
  { id: "edit", label: "Edit", numeric: false, disablePadding: false },
  { id: "delete", label: "Delete", numeric: false, disablePadding: false },
];

const CategoryInfo: React.FC = () => {
  const [category, setCategory] = useState<IRow[]>([]);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<ICategory | null>(null);

  const handleEditClick = (category: ICategory) => {
    setCurrentCategory(category);
    saveCategory(category);
    setEditDialogOpen(true);
  };
  const handleClose = () => {
    setEditDialogOpen(false);;
  };

  const fetchAndPrepareCategory = async () => {
    try {
      const response = await getAllCategory();
      const preparedCategory: IRow[] = response.data.data.map((category: ICategory) => ({
        ...category,
        edit: <button onClick={() => handleEditClick(category)} style={{ all: 'unset' }}><FontAwesomeIcon icon={faPen} style={{ cursor: "pointer", color: "#0c1821" }} /></button>,
        delete: <button onClick={() => handleDeleteCategory(category?._id)} style={{ all: 'unset' }}><FontAwesomeIcon icon={faTrash} style={{ cursor: "pointer", color: "#dd0426" }} /></button>,
      }));
      setCategory(preparedCategory);
    } catch (error) {
      console.error('Failed to fetch category', error);
    }
  };

  useEffect(() => {
    fetchAndPrepareCategory();
  }, []);

  const saveCategory = async (categoryData) => {
    console.log('Saving category:', categoryData);
    setEditDialogOpen(false);
    try {
      const categoryId = currentCategory?._id;
      if (categoryId) {

        // const dataToUpdate = categoryData;
        // console.log(dataToUpdate);
        // delete dataToUpdate._id;
        // delete dataToUpdate.categoryId;
        // console.log(dataToUpdate);

        const data = {
          name: categoryData.name,
          description: categoryData.description,
          costPerKilo: categoryData.costPerKilo
        }
        await updateCategory(categoryId, data);
        console.log('category updated successfully');

        fetchAndPrepareCategory();
      }
      setEditDialogOpen(false);
    } catch (error) {
      console.error('Failed to update category', error);
    }
  };

  const handleDeleteCategory = async (categoryID) => {
    if (!categoryID) {
      console.error('No ID available for deleting the category');
      return;
    };
    try {
      const response = await deleteCategory(categoryID);
      console.log('category deleted successfully:', response);
      setEditDialogOpen(false);

    } catch (error) {
      console.error('Failed to update category', error);
    }
    handleClose;
  };


  return (
    <>
      <ReusableTable
        columns={columns}
        rows={category}
        title="Category"
        rowKey="categoryID"
      />
      {<EditDialog
        isOpen={isEditDialogOpen}
        handleClose={() => setEditDialogOpen(false)}
        entity={currentCategory}
        fields={[
          { name: 'categoryId', label: 'Category Id', type: 'text', disabled: false },
          { name: 'name', label: 'Name', type: 'text', disabled: false },
          { name: 'description', label: 'Description', type: 'text', disabled: false },
          { name: 'costPerKilo', label: 'Cost Per Kilo', type: 'number', disabled: false },
        ]}
        onSave={saveCategory}
        onDelete={deleteCategory}
      />}
    </>
  );
};

export default CategoryInfo;
