INSERT INTO rh_dev.taddrstatus (addrstatus,statusDescInt,statusDescExt,statusType,addrStatusMsg) VALUES
	 (10,'Inserted','Not yet validated',0,91),
	 (11,'Validation validation queue 1 (IP)','Not yet validated',0,91),
	 (12,'Validation queue 2 (install code)','Not yet validated',0,91),
	 (13,'Validation queue 3 (security code)','Not yet validated',0,91),
	 (20,'Validation request authorized','Not yet validated',0,91),
	 (21,'Validation requested','Validation requested',0,92),
	 (22,'Validation request authorized (2nd attempt)','Validation requested',0,92),
	 (23,'Validation requested (2nd attempt)','Validation requested',0,92),
	 (24,'Validation request authorized (3rd attempt)','Validation requested',0,92),
	 (25,'Validation requested (3rd attempt)','Validation requested',0,92);
INSERT INTO rh_dev.taddrstatus (addrstatus,statusDescInt,statusDescExt,statusType,addrStatusMsg) VALUES
	 (29,'Validation error','Validation error',2,93),
	 (50,'Valid and active','Valid and active',1,94),
	 (80,'Replaced by user','Replaced by user',2,95),
	 (90,'Cancelled by user','Cancelled by user',2,96),
	 (91,'Cancelled by services','Cancelled by services',2,96),
	 (92,'Validation error - timeout','Validation error - timeout',2,93),
	 (93,'Cancelled by user request','Cancelled by user request',2,96),
	 (94,'Cancelled - returned email','Cancelled by mail returning',2,96);
