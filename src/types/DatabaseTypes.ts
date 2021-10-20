// Types for all database elements and funcions
export interface EpicenterTblType {
  EpicenterID: number;
  EpicenterName: string;
  MerhavID: number;
  YaamID: number ;
}
export interface EpicenterFacilitiesTblType {
  ID: number;
  EpicenterID: number;
  FacilityName: string;
}
export interface PointTblType {
  GatheringID: number;
  AreaCode: number;
  Area: string;
  SiteCode: string ;
  Site: string;
  GatheringPoint: string;
  Location: string;
}
export interface StateTblType {
  StateID: number;
  StateName: string;
}
export type InsertStateType = {
  stateID: number;
  name: string;
}
interface TrackChangesType {
  syS_CHANGE_OPERATION: 'F' | 'U' | 'I' | 'D'; // first (initial), update, insert, delete,
  currenT_VERSION: number;
}
export interface TrackStateTblType extends StateTblType,TrackChangesType {}
export interface TrackRoleTblType extends RoleTblType, TrackChangesType { }
export interface TrackActionTblType extends ActionTblType, TrackChangesType { }
export interface TrackPointTblType extends PointTblType, TrackChangesType { }
export interface TrackEpicenterTblType extends EpicenterTblType, TrackChangesType { }
export interface TrackEpicenterFacilitiesTblType extends EpicenterFacilitiesTblType, TrackChangesType { }

export interface RoleTblType {
  RoleID: number;
  RoleName: string;
  RoleNumber: string; // one or more job code separated by ;
}
export interface ActionTblType {
  ActionID: number;
  StateID: number;
  RoleID: number;
  SequenceID: number;
  EmergencyAction: string;
}
export type MainTablesType = {
  stateArray: StateTblType[] | null;
  roleArray: RoleTblType[] | null;
  actionArray: ActionTblType[] | null;
  // epicenterArray: EpicenterTblType[] | null;
  // epicenterFacilitiesArray: EpicenterFacilitiesTblType[] | null;
}
export type SapHrType = {
  eMPLOYEE_NAMEField: string ;
  aREA_NAMEField: string ;
  sUBAREA_NAMEField: string;
  cIVIL_DEFENSE_SKILLS_TEXTField: string;
  cIVIL_DEFENSE_SKILLS_CODEField:string;
  jOB_CODEField: string;
  jOB_NAMEField: string;
  aREA_CODEField: number;
  sUBAREA_CODEField: string;
}
export interface ContenType {
  encoded: 'utf8' | 'base64' | null;
}
export interface UpdateDocType {
  ContentEncoded: string | null; //'utf8' | 'base64' 
  LocalPath: string | null; // the local path for the file
  FileContent: string | null; // the actual content to be encypted
}
export interface DocumentDbType {
  DocID: number;
  FileLeafRef: string; // filename.ext
  FileRef: string; // file full path 
  Modified: string;
  FSObjType: number; // 1- folder 0-file
  FileSize: number;
  FSExtType: string;// exp: .txt, .xls, .doc
  content: UpdateDocType; // json updated last
}
export interface Database {
  getPointList(): Promise<void>;
  getStateList(): Promise<void>;
  deleteState(): Promise<number>;
  saveStateTbl(data: Array<InsertStateType>) ;
  changeStateTbl(data: TrackStateTblType[]);
  changeRoleTbl(data: TrackRoleTblType[]);
  changeActionTbl(data: TrackActionTblType[]);
  changePointTbl(data: TrackPointTblType[]);

  getRoleList(): Promise<void>;
  getActionList(): Promise<void>;
  getActionsForStateAndRole(): Promise<void>;
  getDocumentList(): Promise<void>;
  getADocument(docId: number): Promise<DocumentDbType> ;
  saveDocumentList(fileList: []): Promise<void>;
}

export interface ContactType {
  displayName: string;
  givenName: string;
  pic: string | null;
}
export interface WebService {
  getGraphService(): Promise<void>;
}

export interface actionReport {
  action: string; // ActionTblType.EmergencyAction
  done: string; // should have been boolean but send report server can't handle it
}
export type ReportPayload = {
  id: 0,
  userName: string; //eMPLOYEE_NAMEField
  merhav: string; //aREA_NAMEField
  yaam: string; // sUBAREA_NAMEField
  stateName: string ; // StateName
  roleName : string ;// RoleName
  date: string ; // iso format
  actions: { actionReport: actionReport [] };
}
export const PHONE_BOOK_ID = 537;
