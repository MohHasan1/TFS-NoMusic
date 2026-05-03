import { CreateRequestDTO } from "./dto";
import { createRequest as createRequestFromAdapter } from "./requests-pl.adapter";

export async function createRequest(input: CreateRequestDTO) {
  return createRequestFromAdapter(input);
}
