const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// ค้นหา
const filterData = (req) => {
  let $where = {
    deleted_at: null,
  };

  if (req.query.id) {
    $where["id"] = Number(req.query.id);
  }

  if (req.query.user_id) {
    $where["user_id"] = Number(req.query.user_id);
  }

  if (req.query.prefix) {
    $where["prefix"] = req.query.prefix;
  }

  if (req.query.firstname) {
    $where["firstname"] = {
      contains: req.query.firstname,
    };
  }

  if (req.query.surname) {
    $where["surname"] = {
      contains: req.query.surname,
    };
  }

  if (req.query.organization) {
    $where["organization"] = {
      contains: req.query.organization,
    };
  }

  if (req.query.member_status) {
    $where["member_status"] = parseInt(req.query.member_status);
  }

  if (req.query.phone) {
    $where["phone"] = {
      contains: req.query.phone,
    };
  }

  if (req.query.tax_id) {
    $where["tax_id"] = {
      contains: req.query.tax_id,
    };
  }

  if (req.query.is_publish) {
    $where["is_publish"] = parseInt(req.query.is_publish);
  }

  $where["user"] = {};

  if (req.query.status) {
    console.log(req.query.status);
    $where["user"]["status"] = parseInt(req.query.status);
  }

  if (req.query.group_id) {
    $where["user"]["group_id"] = parseInt(req.query.group_id);
  }

  return $where;
};

// หาจำนวนทั้งหมดและลำดับ
const countDataAndOrder = async (req, $where) => {
  //   Order
  let $orderBy = {};
  if (req.query.orderBy) {
    $orderBy[req.query.orderBy] = req.query.order;
  } else {
    $orderBy = { created_at: "desc" };
  }

  //Count
  let $count = await prisma.profile.findMany({
    where: $where,
  });

  $count = $count.length;
  let $perPage = req.query.perPage ? Number(req.query.perPage) : 10;
  let $currentPage = req.query.currentPage ? Number(req.query.currentPage) : 1;
  let $totalPage =
    Math.ceil($count / $perPage) == 0 ? 1 : Math.ceil($count / $perPage);
  let $offset = $perPage * ($currentPage - 1);

  return {
    $orderBy: $orderBy,
    $offset: $offset,
    $perPage: $perPage,
    $count: $count,
    $totalPage: $totalPage,
    $currentPage: $currentPage,
  };
};

// ฟิลด์ที่ต้องการ Select รวมถึง join
const selectField = {
  id: true,
  user_id: true,
  prefix: true,
  firstname: true,
  surname: true,
  contact_address: true,
  invoice_name: true,
  invoice_address: true,
  organization: true,
  member_status: true,
  phone: true,
  tax_id: true,
  is_publish: true,
  user: {
    select: {
      group_id: true,
      status: true,
      email: true,
    },
  },
};

const methods = {
  // ค้นหาทั้งหมด
  async onGetAll(req, res) {
    try {
      let $where = filterData(req);
      let other = await countDataAndOrder(req, $where);

      const item = await prisma.profile.findMany({
        select: selectField,
        where: $where,
        orderBy: other.$orderBy,
        skip: other.$offset,
        take: other.$perPage,
      });

      res.status(200).json({
        data: item,
        totalData: other.$count,
        totalPage: other.$totalPage,
        currentPage: other.$currentPage,
        msg: "success",
      });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  // ค้นหาเรคคอร์ดเดียว
  async onGetById(req, res) {
    try {
      const item = await prisma.profile.findUnique({
        select: selectField,
        where: {
          id: Number(req.params.id),
        },
      });
      res.status(200).json({ data: item, msg: " success" });
    } catch (error) {
      res.status(404).json({ msg: error.message });
    }
  },

  // สร้าง
  async onCreate(req, res) {
    try {
      const item = await prisma.profile.create({
        data: {
          user_id: Number(req.body.user_id),
          prefix: req.body.prefix,
          firstname: req.body.firstname,
          surname: req.body.surname,
          contact_address: req.body.contact_address,
          invoice_name: req.body.invoice_name,
          invoice_address: req.body.invoice_address,
          member_status: Number(req.body.member_status),
          organization: req.body.organization,
          phone: req.body.phone,
          tax_id: req.body.tax_id,
          is_publish: Number(req.body.is_publish),
          created_by: "arnonr",
          updated_by: "arnonr",
        },
      });

      res.status(201).json({ ...item, ...profile, msg: "success" });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  },

  // แก้ไข
  async onUpdate(req, res) {
    try {
      const item = await prisma.profile.update({
        where: {
          id: Number(req.params.id),
        },
        data: {
          user_id:
            req.body.user_id != null ? Number(req.body.user_id) : undefined,
          prefix: req.body.prefix != null ? req.body.prefix : undefined,
          firstname:
            req.body.firstname != null ? req.body.firstname : undefined,
          contact_address:
            req.body.contact_address != null
              ? req.body.contact_address
              : undefined,
          invoice_name:
            req.body.invoice__name != null ? req.body.invoice_name : undefined,
          invoice_address:
            req.body.invoice_address != null
              ? req.body.invoice_address
              : undefined,
          member_status:
            req.body.member_status != null
              ? Number(req.body.member_status)
              : undefined,
          organization:
            req.body.organization != null ? req.body.organization : undefined,
          phone: req.body.phone != null ? req.body.phone : undefined,
          tax_id: req.body.tax_id != null ? req.body.tax_id : undefined,
          is_publish:
            req.body.is_publish != null
              ? Number(req.body.is_publish)
              : undefined,
          updated_by: "arnonr",
        },
      });

      await prisma.user.update({
        where: {
          id: Number(item.user_id),
        },
        data: {
          email: req.body.email != null ?req.body.email : undefined,
          group_id:
            req.body.group_id != null ? Number(req.body.group_id) : undefined,
        },
      });

      res.status(200).json({ ...item, msg: "success" });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  },
  // ลบ
  async onDelete(req, res) {
    try {
      const item = await prisma.profile.update({
        where: {
          id: Number(req.params.id),
        },
        data: {
          deleted_at: new Date().toISOString(),
        },
      });

      res.status(200).json(item);
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  },
};

module.exports = { ...methods };
