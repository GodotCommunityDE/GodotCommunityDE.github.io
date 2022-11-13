# Mesh bearbeiten

## PrimiveMesh in ArrayMesh

Wandelt ein Primitives Mesh (Box, Cylinder, Plane, usw.) in ein ArrayMesh um.

```gdscript title="PrimitiveMesh to ArrayMesh"
# wandelt ein Primitives Mesh in ein ArrayMesh um
# @prop mesh: Mesh
# @returns : ArrayMesh
func pMesh_to_aMesh(mesh: Mesh) -> ArrayMesh:
	# neues Array_mesh
	var array_mesh :ArrayMesh = ArrayMesh.new()

	# wenn primitives mesh
	if mesh is PrimitiveMesh:
		array_mesh.add_surface_from_arrays(Mesh.PRIMITIVE_TRIANGLES, mesh.get_mesh_arrays())
	elif mesh is Mesh:
		array_mesh = mesh
		
	return array_mesh
```


