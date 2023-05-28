import * as React from "react";
import { Theme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { Genre } from "../model/genre";
import { Button } from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

const getStyles = (
  genre: string,
  personName: readonly string[],
  theme: Theme
) => {
  return {
    fontWeight:
      personName.indexOf(genre) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
};

export const FavouriteGenres = ({
  allGenres,
  favourites,
  handleUpdate,
}: {
  allGenres: Genre[];
  favourites: Genre[];
  handleUpdate: (genres: Genre[]) => {};
}) => {
  const theme = useTheme();
  const [selectedGenres, setSelectedGenres] = React.useState<
    (Genre | undefined)[]
  >([]);

  const handleChange = (event: SelectChangeEvent<typeof selectedGenres>) => {
    const {
      target: { value },
    } = event;
    if (value instanceof Array) {
      const newId = value[value.length - 1];
      const existingGenre = value.find((g) => g?.id === newId);
      if (existingGenre) {
        value.splice(value.indexOf(existingGenre), 1);
        value.splice(value.length - 1, 1);
      }
      let newSelected = value.map((g) => {
        if (typeof g === "number") {
          return allGenres.find((genre) => genre.id === g);
        }
        return g;
      });
      newSelected = newSelected.filter(
        (v, i, a) => a.findIndex((v2) => v2?.id === v?.id) === i
      );
      setSelectedGenres(newSelected);
    }
  };

  const submitHandler = (e: any) => {
    e.preventDefault();
    handleUpdate(selectedGenres.map((g) => g ?? { id: -1 }));
  };

  React.useEffect(() => {
    setSelectedGenres(favourites);
  }, [favourites]);

  return (
    <form onSubmit={submitHandler}>
      <FormControl sx={{ m: 1, width: "100%", maxWidth: "400px" }}>
        <InputLabel id="demo-multiple-chip-label">Chip</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={selectedGenres}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((genre) => (
                <Chip key={genre?.id} label={genre?.name} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {allGenres.map((genre) => (
            <MenuItem
              key={genre.id}
              value={genre.id}
              style={getStyles(
                genre.id.toString(),
                allGenres.map((g) => g.id.toString()),
                theme
              )}
            >
              {genre.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button type="submit">Submit</Button>
    </form>
  );
};
