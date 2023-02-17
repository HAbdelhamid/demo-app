import { gql } from "@apollo/client";

export const GET_VIDEO = gql`
  query getVideo($id: ID!) {
    video(id: $id) {
      identifier
      id
      title
      thumbnailUrl
      hls
      longDescription
      minutes
      primaryStyle {
        name
      }
      taxonomies {
        needs {
          name
        }
        styles {
          genres
        }
        instructors {
          name
        }
      }
    }
  }
`;
